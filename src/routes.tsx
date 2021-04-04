import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import history from "utils/history";
import LoadingPage from "pages/info/loading";
import ErrorPage from "pages/info/error";
import Test from "test";
import PrivateRoute from "components/privateRoute";
import { selectSellerAuth } from "state/slices";

const HomePage = lazy(() => import("pages/home"));
const UserAuthPage = lazy(() => import("pages/auth/user"));
const SellerAuthPage = lazy(() => import("pages/auth/seller"));
const ProductOverviewPage = lazy(() => import("pages/product"));
const CartPage = lazy(() => import("pages/cart"));
const Dashboard = lazy(() => import("pages/dashboard"));

const Routes = () => {
	const seller = useSelector(selectSellerAuth);

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
					<Route exact path={"/cart"}>
						<CartPage />
					</Route>
					<Route exact path={"/test/:component"}>
						<Test />
					</Route>
					<PrivateRoute
						auth={Boolean(seller.email && seller.hash)}
						redirect={"/auth/seller"}
						exact
						path={"/dashboard"}>
						<Dashboard />
					</PrivateRoute>
					<Route>
						<ErrorPage error={"404"} />
					</Route>
				</Switch>
			</Suspense>
		</Router>
	);
};

export default Routes;
