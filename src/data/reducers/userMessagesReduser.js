// import { gql } from "../dataGQL";
// import { actionFulfilled, actionPromise } from "./promiseReducer";
// import actionGetAllMessages from "../DataActions/actionMessages";

// const actionGeIncomeMessages = (_id) => async (dispatch) => {
// 	const queryToPromise = gql(
// 		`query messageFind($query:String){
// 		            UserFindOne(query:$query){
// 												incomings{
// 												_id
// 												owner{_id login nick avatar{url} }
// 												to{_id login nick avatar{url}}
// 												createdAt
// 												text}}}`,
// 		{
// 			query: JSON.stringify([{ _id }]),
// 		}
// 	);

// 	const action = actionPromise("inCome", queryToPromise);
// 	const result = await dispatch(action);
// 	const data = result?.incomings;
// 	const payload = await dispatch(actionGetAllMessages(data));
// 	dispatch(actionPromise("userMessages", payload));
// };

// const actionGetOutComeMessages = (_id) => async (dispatch) => {
// 	const queryFromUserPromise = gql(
// 		`query messageFind($query:String){
//             MessageFind(query:$query){
// 										_id
// 										owner{_id login nick }
// 										to{_id login nick }
// 										createdAt
// 										text}}`,
// 		{
// 			query: JSON.stringify([{ $or: [{ ___owner: _id }] }]),
// 		}
// 	);
// 	const result = await queryFromUserPromise;

// 	const payload = await dispatch(actionGetAllMessages(result));
// 	dispatch(actionPromise("userMessages", payload));
// };

// const actionSendText = (message, _id) => async (dispatch) => {
// 	const gqlQuery = `mutation sendMessage($message:MessageInput){
// 						MessageUpsert(message: $message){_id}
// 					}`;
// 	const gqlPromise = gql(gqlQuery, { message });
// 	const action = actionPromise("messageAdd", gqlPromise);
// 	const result = await dispatch(action);
// 	if (result) {
// 		dispatch(actionGetOutComeMessages(_id));
// 	}
// };

// //////////////////////////////////////////////////

// const actionHeaderCountMessages = (newIncomes) => async (dispatch, getState) => {
// 	const oldMessagesCount = getState().messages?.inCome || [];
// 	const exectCount = getState().messages?.newMessagesCount || 0;
// 	const payload = String(+exectCount + (newIncomes.length - oldMessagesCount.length));

// 	await dispatch(actionFulfilled("newMessagesCount", payload));
// };

// const actionHeaderCountMessagesUpdate = (update) => async (dispatch, getState) => {
// 	const oldCount = getState().messages.newMessagesCount;
// 	const payload = String(oldCount - update);

// 	await dispatch(actionFulfilled("newMessagesCount", payload));
// };

// const actionMessagesUpdate = (payload) => (dispatch) => {
// 	dispatch({ type: "userMessages", payload });
// };

// export {
// 	actionSendText,
// 	actionGeIncomeMessages,
// 	actionGetOutComeMessages,
// 	actionHeaderCountMessages,
// 	actionHeaderCountMessagesUpdate,
// 	actionMessagesUpdate,
// };
