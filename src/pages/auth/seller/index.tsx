import React from "react";
import Auth from "components/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "state/actions";
import { selectSellerAuth } from "state/slices";
import history from "utils/history";

const SellerAuthPage = () => {
	const dispatch = useDispatch();
	const seller = useSelector(selectSellerAuth);

	React.useEffect(() => {
		if (seller.email && seller.hash) {
			history.push("/");
		}
	}, [seller]);

	const authHandler = (email: any, pwd: any, mode: string) => {
		if (email && pwd) {
			switch (mode) {
				case "login":
					dispatch(
						AuthAction.sellerLoginAuth({
							email: email,
							hash: pwd,
							type: "seller",
							error: "",
						})
					);
					break;

				case "signup":
					dispatch(
						AuthAction.sellerLoginAuth({
							email: email,
							hash: pwd,
							type: "seller",
							error: "",
						})
					);
					break;
			}
		}
	};

	return <Auth option="seller" handler={authHandler} />;
};

export default SellerAuthPage;
