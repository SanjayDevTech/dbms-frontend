import React from "react";
import Auth from "components/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "state/actions";
import { selectUserAuth } from "state/slices";
import history from "utils/history";
import { validateEmail } from "utils/validation";

const UserAuthPage = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUserAuth);

	const [error, setError] = React.useState({ error: "" });

	React.useEffect(() => {
		if (user.email && user.hash) {
			history.push("/");
		}
		if (user.error) {
			setError({ error: user.error });
		}
	}, [user]);

	const clearHandler = () => {
		dispatch(AuthAction.userLogoutAuth());
	};

	const authHandler = (email: string, pwd: string, mode: string) => {
		if (email && pwd) {
			if (validateEmail(email) && pwd.length > 6) {
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
			} else {
				setError({ error: "Invalid email or weak password" });
			}
		}
	};

	return (
		<Auth
			option="user"
			clearHandler={clearHandler}
			error={error}
			handler={authHandler}
		/>
	);
};

export default UserAuthPage;
