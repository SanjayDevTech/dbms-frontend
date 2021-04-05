import React from "react";
import Auth from "components/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "state/actions";
import { selectUserAuth } from "state/slices";
import history from "utils/history";

const UserAuthPage = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUserAuth);

	const [error, setError] = React.useState({error: ""});

	React.useEffect(() => {
		if (user.email && user.hash) {
			history.push("/");
		}
		if(user.error) {
			setError({error: user.error});
		}
	}, [user]);

	const authHandler = (email: string, pwd: string, mode: string) => {
		if (email && pwd) {
			switch (mode) {
				case "login":
					dispatch(
						AuthAction.userRequestAuth({
							email: email,
							pwd: pwd,
							mode: "login",
							type: "user",
						})
					);
					break;

				case "signup":
					dispatch(
						AuthAction.userRequestAuth({
							email: email,
							pwd: pwd,
							mode: "signup",
							type: "user",
						})
					);
					break;
			}
		}
	};

	return <Auth option="user" error={error} handler={authHandler} />;
};

export default UserAuthPage;
