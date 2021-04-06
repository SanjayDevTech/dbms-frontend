import { ProductType } from "utils/types";
import AuthStateType from "./auth/types";

export interface ActionType<T> {
	type: string;
	payload: T;
}

export default interface ReduxStateType {
	cart: ProductType[];
	auth: AuthStateType;
}
