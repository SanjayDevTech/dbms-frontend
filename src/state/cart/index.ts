import { ProductType } from "utils/types";
import * as Action from "./actionTypes";
import { ActionType } from "state/types";

const initialState: ProductType[] = [];

const cartReducer = (
	state: ProductType[] = initialState,
	action: ActionType<any>
) => {
	switch (action.type) {
		case Action.CART_CLEAR:
			return [];

		case Action.CART_ADD:
			return [
				...state.filter((cart) => cart.id !== action.payload.id),
				action.payload,
			];

		case Action.CART_REMOVE:
			return [...state.filter((cart) => cart.id !== action.payload.id)];

		default:
			return state;
	}
};

export default cartReducer;
