import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "state";
import { throttle } from "lodash";
import { loadState, saveState } from "utils/storage";

const persistedState = loadState();

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(
	throttle(() => {
		saveState(store.getState());
	}, 1000)
);

export default store;
