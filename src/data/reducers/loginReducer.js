import { gql } from "../dataGQL";
import { actionPromise } from "./promiseReducer";
import { history } from "../../App";
import { actionUserInfo } from "./aboutMeRudecer";

const jwtDecode = (token) => {
	try {
		return JSON.parse(atob(token.split(".")[1]));
	} catch (e) {}
};

const authReducer = (state = {}, { type, token }) => {
	if (type === "AUTH_LOGIN") {
		const payload = jwtDecode(token);
		if (payload) return { token, payload };
	}
	if (type === "AUTH_LOGOUT") {
		return {};
	}
	return state;
};

const actionAuthLogin = (token) => (dispatch, getState) => {
	const oldState = getState().auth;
	dispatch({ type: "AUTH_LOGIN", token });
	const newState = getState().auth;
	if (newState !== oldState) {
		localStorage.authToken = token;
	}
	const userId = getState().auth?.payload?.sub?.id;
	dispatch(actionUserInfo(userId));
};

const actionAuthLogout = () => (dispatch) => {
	dispatch({ type: "AUTH_LOGOUT" });
	localStorage.clear();
	history.push("/login");
};

const actionFullLogin = (login, password) => async (dispatch) => {
	const gqlQuery = `query log($login:String!, $password:String!){
		login(login:$login, password:$password)
	}`;
	const gqlPromise = gql(gqlQuery, { login, password });
	const action = actionPromise("login", gqlPromise);
	const result = await dispatch(action);
	dispatch(actionAuthLogin(result));
	if (result) {
		history.push("/dashboard");
	}
};

export { authReducer, actionFullLogin, actionAuthLogout, actionAuthLogin };
