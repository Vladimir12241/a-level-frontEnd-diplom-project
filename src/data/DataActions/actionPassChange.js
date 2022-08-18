import { actionFullLogin } from "../reducers";
import { gql } from "../dataGQL";
import { actionPromise } from "../reducers";

const actionChangePass = (login, password, newPassword) => async (dispatch) => {
	const gqlQuery = `mutation addUser($login: String!,$password: String!,$newPassword: String!){
		changePassword(login: $login,password: $password,newPassword: $newPassword){_id}}`;

	const gqlPromise = gql(gqlQuery, { login, password, newPassword });
	const action = actionPromise("passCahange", gqlPromise);
	const result = await dispatch(action);
	if (result) {
		dispatch(actionFullLogin(login, newPassword));
	}
};

export default actionChangePass;
