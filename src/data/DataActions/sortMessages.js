const newUserMessages = (message, _id) => {
	const userName =
		message.owner._id !== _id ? message.owner.nick || message.owner.login : message.to.nick || message.to.login;
	const userId = message.owner._id !== _id ? message.owner._id : message.to._id;
	const userAvatar = message.owner._id !== _id ? message.owner.avatar?.url : message.to.avatar?.url;
	const newUser = {
		user: userName,
		_id: userId,
		avatar: userAvatar,
		messages: [message],
	};
	return newUser;
};

const messagesSort = (_id, messages, sortedMessages) => {
	for (let message of messages) {
		let isUser = false;
		if (sortedMessages.length) {
			sortedMessages.forEach((user) => {
				if (user._id === message.owner?._id || user._id === message.to?._id) {
					let unick = true;
					isUser = true;
					user.messages.forEach((item) => {
						if (item._id === message._id) {
							unick = false;
						}
					});
					if (unick) {
						user.messages.push(message);
					}
				}
			});
		}
		if (!sortedMessages.length || !isUser) {
			sortedMessages.push(newUserMessages(message, _id));
		}
	}
	return sortedMessages;
};

const countUpdate = (newList, myId) => {
	newList.forEach((user) => {
		let newInocmeCount = 0;
		user.messages.forEach((item) => {
			if (item.to._id === myId) newInocmeCount += 1;
		});
		const lastCount = JSON.parse(localStorage[user._id] || "{}");
		if (newInocmeCount !== lastCount?.incomeLength || !lastCount?.incomeLength) {
			user.newMessages = (user?.newMessages || 0) + (newInocmeCount - (lastCount?.readed || 0));
			localStorage[user._id] = JSON.stringify({ incomeLength: newInocmeCount, readed: lastCount.readed || 0 });
		} else {
			user.newMessages = newInocmeCount - (lastCount?.readed || 0);
		}
		if (user.newMessages < 0) {
			user.newMessages = 0;
		}
	});

	newList.map((item) =>
		item.messages.sort((a, b) => {
			if (a.createdAt < b.createdAt) {
				return 1;
			}
			if (a.createdAt > b.createdAt) {
				return -1;
			}
			return 0;
		})
	);

	return newList;
};

const actionGetAllMessages = (messages) => (dispatch, getState) => {
	const myId = getState().userInfo?.payload?._id;
	const sortedMessages = getState().promise?.userMessages?.payload || [];
	const newList = messagesSort(myId, messages, sortedMessages);
	const finalList = countUpdate(newList, myId);
	return finalList;
};

export default actionGetAllMessages;
