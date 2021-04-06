import { ProductType } from "utils/types";
import { RoleStateType } from "./auth/types";
import ReduxStateType from "./types";

export const selectCart = (state: ReduxStateType): ProductType[] => state.cart;

export const selectUserAuth = (state: ReduxStateType): RoleStateType =>
	state.auth.user;

export const selectSellerAuth = (state: ReduxStateType): RoleStateType =>
	state.auth.seller;
