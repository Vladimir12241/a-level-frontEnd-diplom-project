import { gql } from "../dataGQL";
import { actionFullLogin } from "./loginReducer";
import { actionPromise } from "./promiseReducer";

const signupReducer = (state = {}, { type, payload }) => {
	if (type === "SIGNUP") {
		if (!!payload) {
			return { payload };
		}
	}

	return state;
};

const actionSignup = (result, login, password) => (dispatch) => {
	dispatch({ type: "SIGNUP" });
	if (result) {
		dispatch(actionFullLogin(login, password));
	}
};

const actionFullSignup = (login, password) => async (dispatch) => {
	const gqlQuery = `mutation addUser($login:String!, $password:String!){
		createUser(login: $login, password: $password){_id}}`;
	const gqlPromise = gql(gqlQuery, { login, password });
	const action = actionPromise("signup", gqlPromise);
	const result = await dispatch(action);

	dispatch(actionSignup(result, login, password));
};

export { signupReducer, actionFullSignup };
