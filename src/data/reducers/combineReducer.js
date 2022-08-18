import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { promiseReducer } from "./promiseReducer";
import { actionAuthLogin, authReducer } from "./loginReducer";
import { signupReducer } from "./signupReduser";
import { userInfoReducer } from "./aboutMeRudecer";

const combinedReducers = combineReducers({
	promise: promiseReducer,
	auth: authReducer,
	signUp: signupReducer,
	userInfo: userInfoReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

/// ПРоверить локал есть ли токен!
if (!!localStorage.authToken) store.dispatch(actionAuthLogin(localStorage.authToken));

export default store;
