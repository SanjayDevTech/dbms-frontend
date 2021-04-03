import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "utils/history";
import LoadingPage from "pages/info/loading";
import ErrorPage from "pages/info/error";
import Test from "test";

const HomePage = lazy(() => import("pages/home"));
const UserAuthPage = lazy(() => import("pages/auth/user"));
const SellerAuthPage = lazy(() => import("pages/auth/seller"));
const ProductOverviewPage = lazy(() => import("pages/product"));
const CheckoutPage = lazy(() => import("pages/checkout"));

const Routes = () => {
	return (
		<Router history={history}>
			<Suspense fallback={<LoadingPage />}>
				<Switch>
					<Route exact path={"/"}>
						<HomePage />
					</Route>
					<Route exact path={"/auth/user"}>
						<UserAuthPage />
					</Route>
					<Route exact path={"/auth/seller"}>
						<SellerAuthPage />
					</Route>
					<Route exact path={"/product/:productId"}>
						<ProductOverviewPage />
					</Route>
					<Route exact path={"/checkout"}>
						<CheckoutPage />
					</Route>
					<Route exact path={"/loading"}>
						<LoadingPage />
					</Route>
					<Route exact path={"/test/:component"}>
						<Test />
					</Route>
					<Route>
						<ErrorPage error={"404"} />
					</Route>
				</Switch>
			</Suspense>
		</Router>
	);
};

export default Routes;
