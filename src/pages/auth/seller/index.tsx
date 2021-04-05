import React from "react";
import Auth from "components/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "state/actions";
import { selectSellerAuth } from "state/slices";
import history from "utils/history";
import { validateEmail } from "utils/validation";

const SellerAuthPage = () => {
	const dispatch = useDispatch();
	const seller = useSelector(selectSellerAuth);

	const [error, setError] = React.useState({ error: "" });

	React.useEffect(() => {
		if (seller.email && seller.hash) {
			history.push("/");
		}
		if (seller.error) {
			setError({ error: seller.error });
		}
	}, [seller]);

	const clearHandler = () => {
		dispatch(AuthAction.sellerLogoutAuth());
	};

	const authHandler = (email: any, pwd: any, mode: string) => {
		if (email && pwd) {
			if (validateEmail(email) && pwd.length > 6) {
				switch (mode) {
					case "login":
						dispatch(
							AuthAction.sellerRequestAuth({
								email: email,
								pwd: pwd,
								mode: "login",
								type: "seller",
							})
						);
						break;

					case "signup":
						dispatch(
							AuthAction.sellerRequestAuth({
								email: email,
								pwd: pwd,
								mode: "signup",
								type: "seller",
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
			option="seller"
			error={error}
			clearHandler={clearHandler}
			handler={authHandler}
		/>
	);
};

export default SellerAuthPage;
