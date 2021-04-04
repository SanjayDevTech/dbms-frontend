import * as Action from "./actionTypes";
import { ActionType } from "state/types";
import ProductStateType from "./types";

const initialState: ProductStateType = {
	product: [],
	loading: false,
	error: "",
};

const productReducer = (
	state: ProductStateType = initialState,
	action: ActionType<any>
): ProductStateType => {
	switch (action.type) {
		case Action.PRODUCT_FETCH_STATUS:
			return { ...state, loading: action.payload, error: "" };

		case Action.PRODUCT_FETCH_SUCCESS:
			return { product: action.payload, loading: false, error: "" };

		case Action.PRODUCT_FETCH_FAILURE:
			return { product: [], loading: false, error: action.payload };

		default:
			return state;
	}
};

export default productReducer;
