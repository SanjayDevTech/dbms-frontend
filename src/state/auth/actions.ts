import { Dispatch } from "react";
import { backendAPI } from "services/http";
import { ActionType } from "state/types";
import * as Action from "./actionTypes";
import { FormDataType, RoleStateType } from "./types";

export const userLogoutAuth = (): ActionType<string> => ({
	type: Action.AUTH_USER_LOGOUT,
	payload: "",
});

export const userLoginAuth = (
	credentials: RoleStateType
): ActionType<RoleStateType> => ({
	type: Action.AUTH_USER_LOGIN,
	payload: credentials,
});

export const userFailureAuth = (error: string | null): ActionType<string> => ({
	type: Action.AUTH_USER_FAILURE,
	payload: error || "Unknown error",
});

export const userRequestAuth = (data: FormDataType) => {
	return (dispatch: Dispatch<any>) => {
		backendAPI
			.post<RoleStateType>("/auth", data)
			.then((res) => {
				if (res.status === 200) {
					dispatch(userLoginAuth(res.data));
				} else {
					dispatch(userFailureAuth(res.data.error));
					console.log("Error code: " + res.status);
				}
			})
			.catch((e) => {
				dispatch(userFailureAuth(e));
				console.log("Error code: " + e);
			});
	};
};

export const sellerLogoutAuth = (): ActionType<string> => ({
	type: Action.AUTH_SELLER_LOGOUT,
	payload: "",
});

export const sellerLoginAuth = (
	credentials: RoleStateType
): ActionType<RoleStateType> => ({
	type: Action.AUTH_SELLER_LOGIN,
	payload: credentials,
});

export const sellerFailureAuth = (
	error: string | null
): ActionType<string> => ({
	type: Action.AUTH_SELLER_FAILURE,
	payload: error || "Unknown error",
});

export const sellerRequestAuth = (data: FormDataType) => {
	return (dispatch: Dispatch<any>) => {
		backendAPI
			.post<RoleStateType>("/auth", data)
			.then((res) => {
				if (res.status === 200) {
					dispatch(sellerLoginAuth(res.data));
				} else {
					dispatch(sellerFailureAuth(res.data.error));
					console.log("Error code: " + res.status);
				}
			})
			.catch((e) => {
				dispatch(sellerFailureAuth(e));
				console.log("Error code: " + e);
			});
	};
};
