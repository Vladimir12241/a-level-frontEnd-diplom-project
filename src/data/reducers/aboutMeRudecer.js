import { gql } from "../dataGQL";
import { actionPromise } from "./promiseReducer";
import { history } from "../../App";

const userInfoReducer = (state = {}, { type, payload }) => {
	if (type === "USER_INFO") {
		if (!!payload) {
			return { payload };
		}
	}

	return state;
};

const actionUserData = (payload) => (dispatch) => {
	dispatch({ type: "USER_INFO", payload });
};

const actionUserInfo = (_id) => async (dispatch) => {
	const queryPromise = gql(
		`query userFind($query:String!){
            UserFindOne(query:$query){
				_id
				createdAt
				login
				nick
				avatar{url}
		}
	}`,
		{ query: JSON.stringify([{ _id }]) }
	);

	const action = actionPromise("userInfo", queryPromise);
	const payload = await dispatch(action);
	dispatch(actionUserData(payload));
};

const actionUserUpdate = (user) => async (dispatch) => {
	const gqlQuery = `mutation userUpdata($user:UserInput){
	        		UserUpsert(user: $user){
						_id
				createdAt
				login
				nick
				avatar{url}
					}
					}`;
	const gqlPromise = gql(gqlQuery, { user });
	const action = actionPromise("userInfo", gqlPromise);
	await dispatch(action);
	history.push("/profile");
};

export { actionUserInfo, userInfoReducer, actionUserUpdate };
