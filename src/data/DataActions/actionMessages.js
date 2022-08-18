import { gql } from "../dataGQL";
import { actionFulfilled, actionPromise } from "../reducers";
import actionGetAllMessages from "./sortMessages";

const actionGeIncomeMessages = (_id) => async (dispatch) => {
	const queryToPromise = gql(
		`query messageFind($query:String){
		            UserFindOne(query:$query){
												incomings{
												_id
												owner{_id login nick avatar{url} }
												to{_id login nick avatar{url}}
												createdAt
												text}}}`,
		{
			query: JSON.stringify([{ _id }]),
		}
	);

	const result = await dispatch(actionPromise("inCome", queryToPromise));
	const data = result?.incomings;
	dispatch(actionHeaderCountMessages(data.length));
	const payload = await dispatch(actionGetAllMessages(data));
	dispatch(actionPromise("userMessages", payload));
};

const actionGetOutComeMessages = (_id) => async (dispatch) => {
	const queryFromUserPromise = gql(
		`query messageFind($query:String){
            MessageFind(query:$query){
										_id
										owner{_id login nick }
										to{_id login nick }
										createdAt
										text}}`,
		{
			query: JSON.stringify([{ $or: [{ ___owner: _id }] }]),
		}
	);
	const result = await queryFromUserPromise;

	const payload = await dispatch(actionGetAllMessages(result));
	dispatch(actionPromise("userMessages", payload));
};

const actionSendText = (message, _id) => async (dispatch) => {
	const gqlQuery = `mutation sendMessage($message:MessageInput){
						MessageUpsert(message: $message){_id}
					}`;
	const gqlPromise = gql(gqlQuery, { message });
	const action = actionPromise("messageAdd", gqlPromise);
	const result = await dispatch(action);
	if (result) {
		dispatch(actionGetOutComeMessages(_id));
	}
};

//////////////////////////////////////////////////

const actionHeaderCountMessages = (newIncomes) => async (dispatch) => {
	const totalCount = JSON.parse(localStorage.headerCount || "{}");
	let payload;
	if (newIncomes !== totalCount.incomeLength || !totalCount.incomeLength) {
		payload = newIncomes - (totalCount?.readed || 0);
		localStorage.headerCount = JSON.stringify({ incomeLength: newIncomes, readed: totalCount?.readed || 0 });
	} else {
		payload = newIncomes - (totalCount?.readed || 0);
	}
	await dispatch(actionFulfilled("newMessagesCount", payload));
};

const actionHeaderCountMessagesUpdate = (update) => (dispatch) => {
	const totalCount = JSON.parse(localStorage.headerCount);
	const newCount = totalCount.readed + update;
	localStorage.headerCount = JSON.stringify({
		incomeLength: totalCount.incomeLength,
		readed: newCount,
	});

	let payload = totalCount.incomeLength - update;
	if (payload < 0) payload = 0;
	dispatch(actionFulfilled("newMessagesCount", payload));
};

const actionMessagesUpdate = (userId) => (dispatch, getState) => {
	const messages = getState().promise?.userMessages?.payload;
	messages?.forEach((user) => {
		if (user._id === userId) {
			const lastCount = JSON.parse(localStorage[user._id]);
			const newCount = lastCount.readed + user.newMessages;
			localStorage[user._id] = JSON.stringify({
				incomeLength: lastCount.incomeLength,
				readed: newCount,
			});
			dispatch(actionHeaderCountMessagesUpdate(user.newMessages));
			user.newMessages = 0;
		}
	});

	dispatch(actionFulfilled("userMessages", messages));
};

export { actionSendText, actionGeIncomeMessages, actionGetOutComeMessages, actionMessagesUpdate };
