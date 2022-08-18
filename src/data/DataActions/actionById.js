import { gql } from "../dataGQL";
import { actionPromise } from "../reducers/promiseReducer";

const actionAdById = (_id) => async (dispatch) => {
	const queryPromise = gql(
		`query adOne($query:String!){
            AdFindOne(query:$query){
				_id owner{_id login} images{_id
					url
					originalFileName}
            createdAt 
			title 
			description
            tags
            address
            price
		}
	}`,
		{ query: JSON.stringify([{ _id }]) }
	);

	const action = actionPromise("AdById", queryPromise);
	await dispatch(action);
};

export default actionAdById;
