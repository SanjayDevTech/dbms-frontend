import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./cart";
import productReducer from "./product";

const rootReducer = combineReducers({
	cart: cartReducer,
	product: productReducer,
	auth: authReducer,
});

export default rootReducer;
