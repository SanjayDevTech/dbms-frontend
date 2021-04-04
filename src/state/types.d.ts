import { ProductType } from "utils/types";
import AuthStateType from "./auth/types";
import ProductStateType from "./product/types";

export interface ActionType<T> {
	type: string;
	payload: T;
}

export default interface ReduxStateType {
	cart: ProductType[];
	product: ProductStateType;
	auth: AuthStateType;
}
