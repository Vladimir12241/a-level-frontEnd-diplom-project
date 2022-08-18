import { gql } from "../dataGQL";
import { actionPromise } from "../reducers/promiseReducer";

const actionGetComments = (_id) => async (dispatch) => {
	const queryPromise = gql(
		`query getComments($query:String!){
				AdFindOne(query:$query){
				comments{
					_id 
					owner{_id nick login}
					text
					createdAt
					ad{_id}
					answerTo{_id} 
				}
			}
		}`,
		{ query: JSON.stringify([{ _id }]) }
	);

	const action = actionPromise("getComments", queryPromise);
	await dispatch(action);
};

const actionAddComment = (comment) => async (dispatch) => {
	const gqlQuery = `mutation addComment($comment:CommentInput){
	        		CommentUpsert(comment: $comment){_id ad{_id}}
					}`;
	const gqlPromise = gql(gqlQuery, { comment });
	const action = actionPromise("CommentAdd", gqlPromise);
	const result = await dispatch(action);
	dispatch(actionGetComments(result.ad._id));
};

export { actionAddComment, actionGetComments };
