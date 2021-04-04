import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as Types from "./types";

const PrivateRoute = ({
	auth,
	redirect,
	...routeProps
}: Types.PrivateRoutePropsI) => {
	if (auth) {
		<Route {...routeProps} />;
	} else {
		<Redirect to={redirect || "/"} />;
	}
};

export default PrivateRoute;
