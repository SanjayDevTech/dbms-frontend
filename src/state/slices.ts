import { ProductType } from "utils/types";
import ReduxStateType from "./types";

export const selectCart = (state: ReduxStateType): ProductType[] => state.cart;

export const selectProductData = (state: ReduxStateType): ProductType[] =>
	state.product.product;

export const selectProductStatus = (state: ReduxStateType): boolean =>
	state.product.loading;

export const selectProductError = (state: ReduxStateType): string =>
	state.product.error;
