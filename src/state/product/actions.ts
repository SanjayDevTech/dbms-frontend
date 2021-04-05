import { Dispatch } from "react";
import { backendAPI } from "services/http";
import { ActionType } from "state/types";
import { ProductType } from "utils/types";
import * as Action from "./actionTypes";

export const fetchStatusProduct = (loading: boolean): ActionType<boolean> => ({
	type: Action.PRODUCT_FETCH_STATUS,
	payload: loading,
});

export const fetchSuccessProduct = (
	products: ProductType[]
): ActionType<ProductType[]> => ({
	type: Action.PRODUCT_FETCH_SUCCESS,
	payload: products,
});

export const fetchFailureProduct = (error: string): ActionType<string> => ({
	type: Action.PRODUCT_FETCH_FAILURE,
	payload: error,
});

export const fetchRequestProduct = (query: string = "") => {
	return (dispatch: Dispatch<ActionType<ProductType[] | string | boolean>>) => {
		dispatch(fetchStatusProduct(true));
		backendAPI
			.get<ProductType[]>("/products?query=" + query)
			.then((res) => {
				if (res.status === 200) {
					const products = res.data;
					dispatch(fetchSuccessProduct(products));
				} else {
					dispatch(fetchFailureProduct("Error code: " + res.status));
				}
			})
			.catch((e) => {
				dispatch(fetchFailureProduct(e.message));
			})
			.finally(() => {
				dispatch(fetchStatusProduct(false));
			});
	};
};

export const clearProduct = (): ActionType<string> => ({
	type: Action.PRODUCT_CLEAR,
	payload: "",
});
