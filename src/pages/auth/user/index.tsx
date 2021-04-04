import React from "react";
import Auth from "components/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "state/actions";
import { selectUserAuth } from "state/slices";
import history from "utils/history";

const UserAuthPage = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUserAuth);

	React.useEffect(() => {
		if (user.email && user.hash) {
			history.push("/");
		}
	}, [user]);

	const authHandler = (email: string, pwd: string, mode: string) => {
		if (email && pwd) {
			switch (mode) {
				case "login":
					dispatch(
						AuthAction.userLoginAuth({
							email: email,
							hash: pwd,
							type: "user",
							error: "",
						})
					);
					break;

				case "signup":
					dispatch(
						AuthAction.userLoginAuth({
							email: email,
							hash: pwd,
							type: "user",
							error: "",
						})
					);
					break;
			}
		}
	};

	return <Auth option="user" handler={authHandler} />;
};

export default UserAuthPage;
