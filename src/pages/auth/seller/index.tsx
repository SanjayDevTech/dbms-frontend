import React from "react";
import Auth from "components/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "state/actions";
import { selectSellerAuth } from "state/slices";
import history from "utils/history";

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

	const authHandler = (email: any, pwd: any, mode: string) => {
		if (email && pwd) {
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
		}
	};

	return <Auth option="seller" error={error} handler={authHandler} />;
};

export default SellerAuthPage;
