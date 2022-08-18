import { gql } from "../dataGQL";
import { actionFulfilled, actionPromise } from "../reducers/promiseReducer";
import { history } from "../../App";

const actionCreatePost = (Ad) => async (dispatch) => {
	const gqlQuery = `mutation addComment($Ad:AdInput){
	        		AdUpsert(ad: $Ad){_id}
					}`;
	const gqlPromise = gql(gqlQuery, { Ad });
	const action = actionPromise("createAd", gqlPromise);
	const result = await dispatch(action);
	if (result) {
		history.push(`/dashboard/${result._id}`);
		dispatch(actionFulfilled("isUpLoaded", []));
	}
};

export default actionCreatePost;
