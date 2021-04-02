import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import LoadingPage from "./pages/info/loading";

const HomePage = lazy(() => import("./pages/home"));
const UserAuthPage = lazy(() => import("./pages/auth/user"));
const SellerAuthPage = lazy(() => import("./pages/auth/seller"));
const ProductOverviewPage = lazy(() => import("./pages/product"));
const CheckoutPage = lazy(() => import("./pages/checkout"));
const Error404Page = lazy(() => import("./pages/info/404"));

const Routes = () => {
	return (
		<Router history={history}>
			<Suspense fallback={<LoadingPage />}>
				<Switch>
					<Route exact path={"/"} component={HomePage} />
					<Route exact path={"/auth/user"} component={UserAuthPage} />
					<Route exact path={"/auth/seller"} component={SellerAuthPage} />
					<Route
						exact
						path={"/product/:productId"}
						component={ProductOverviewPage}
					/>
					<Route exact path={"/checkout"} component={CheckoutPage} />
					<Route component={Error404Page} />
				</Switch>
			</Suspense>
		</Router>
	);
};

export default Routes;
