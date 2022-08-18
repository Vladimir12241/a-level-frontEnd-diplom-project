const promiseReducer = (state, { name, type, status, payload, error }) => {
	if (state === undefined) {
		return {};
	}

	if (type === "PROMISE") {
		return { ...state, [name]: { status, payload, error } };
	}

	return state;
};

const actionPending = (name) => ({ type: "PROMISE", status: "PENDING", name });
const actionFulfilled = (name, payload) => ({ type: "PROMISE", status: "FULFILLED", name, payload });
const actionRejected = (name, error) => ({ type: "PROMISE", status: "REJECTED", name, error });

const actionPromise = (name, promise) => async (dispatch) => {
	dispatch(actionPending(name));
	try {
		let payload = await promise;
		dispatch(actionFulfilled(name, payload));
		return payload;
	} catch (err) {
		dispatch(actionRejected(name, err));
	}
};

export { promiseReducer, actionPromise, actionFulfilled };
