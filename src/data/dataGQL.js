const URL = "http://marketplace.node.ed.asmer.org.ua/";
const uploadURL = `${URL}upload`;

const getGQL =
	(url) =>
	(query, variables = {}) =>
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				...(localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {}),
			},
			body: JSON.stringify({ query, variables }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.data) {
					return Object.values(data.data)[0];
				} else throw new Error(JSON.stringify(data.errors));
			});

const gql = getGQL(`${URL}graphql`);

export { gql, URL, uploadURL };
