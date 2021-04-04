import { ActionType } from "state/types";
import { ProductType } from "utils/types";
import * as Action from "./actionTypes";

export const clearCart = (): ActionType<string> => ({
	type: Action.CART_CLEAR,
	payload: "",
});

export const addCart = (product: ProductType): ActionType<ProductType> => ({
	type: Action.CART_ADD,
	payload: product,
});

export const removeCart = (id: number): ActionType<number> => ({
	type: Action.CART_REMOVE,
	payload: id,
});
