const sortComments = (data) => {
	const result = [];

	for (let item of data) {
		let isAnswers = false;
		data.forEach((parent) => {
			if (item.answerTo?._id === parent._id) {
				isAnswers = true;
				typeof parent.answers === Array ? parent.answers.push(item) : (parent.answers = [item]);
			}
		});
		if (!isAnswers) {
			result.push(item);
		}
	}
	return result;
};

export default sortComments;
