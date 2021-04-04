import * as Action from "./actionTypes";
import AuthStateType from "./types";
import { ActionType } from "state/types";

const initialState: AuthStateType = {
	user: {
		email: "",
		hash: "",
		type: "user",
		error: "",
	},
	seller: {
		email: "",
		hash: "",
		type: "seller",
		error: "",
	},
};

const authReducer = (
	state: AuthStateType = initialState,
	action: ActionType<any>
): AuthStateType => {
	switch (action.type) {
		case Action.AUTH_USER_LOGOUT:
			return {
				seller: state.seller,
				user: { email: "", hash: "", type: "user", error: "" },
			};

		case Action.AUTH_USER_FAILURE:
			return {
				seller: state.seller,
				user: { email: "", hash: "", type: "user", error: action.payload },
			};

		case Action.AUTH_USER_LOGIN:
			return {
				seller: state.seller,
				user: action.payload,
			};

		case Action.AUTH_SELLER_LOGOUT:
			return {
				user: state.user,
				seller: { email: "", hash: "", type: "seller", error: "" },
			};

		case Action.AUTH_SELLER_FAILURE:
			return {
				user: state.user,
				seller: { email: "", hash: "", type: "seller", error: action.payload },
			};

		case Action.AUTH_SELLER_LOGIN:
			return {
				user: state.user,
				seller: action.payload,
			};

		default:
			return state;
	}
};

export default authReducer;
