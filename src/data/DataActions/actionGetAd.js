import { actionFulfilled } from "../reducers/promiseReducer";
import { gql } from "../dataGQL";

const actionGetAllAd = (search) => async (dispatch, getState) => {
	const oldAd = getState().promise?.allAdd?.payload || [];
	const skip = oldAd.length;

	const queryPromise = gql(
		`query allAdd($query:String){AdFind(query:$query){_id images {url}
			  title
			  tags
			  price}}`,
		{
			query: JSON.stringify([
				search ? { $or: [{ title: `/${search}/` }, { description: `/${search}/` }, { tags: `/${search}/` }] } : {},
				{
					sort: [{ _id: -1 }],
					skip: [skip],
					limit: [6],
				},
			]),
		}
	);
	const newAd = await queryPromise;
	dispatch(actionFulfilled("allAdd", [...oldAd, ...newAd]));
};

const actionClearAllAdd = () => (dispatch) => {
	dispatch(actionFulfilled("allAdd", []));
};

export { actionGetAllAd, actionClearAllAdd };
