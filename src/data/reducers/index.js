import store from "./combineReducer";
import { promiseReducer, actionPromise, actionFulfilled } from "./promiseReducer";
import { signupReducer, actionFullSignup } from "./signupReduser";
import { authReducer, actionFullLogin, actionAuthLogout, actionAuthLogin } from "./loginReducer";
import { actionUserInfo, userInfoReducer, actionUserUpdate } from "./aboutMeRudecer";

export {
	store,
	promiseReducer,
	actionPromise,
	actionFulfilled,
	signupReducer,
	actionFullSignup,
	authReducer,
	actionFullLogin,
	actionAuthLogout,
	actionAuthLogin,
	actionUserInfo,
	userInfoReducer,
	actionUserUpdate,
};
