import { RouteProps } from "react-router-dom";

export interface PrivateRoutePropsI extends RouteProps {
	auth: boolean;
	redirect?: string;
}
