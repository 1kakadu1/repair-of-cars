export const filterUpdate = <T extends { [key: string]: any }>(payload: T) => {
	const filter = { ...payload };

	Object.keys(filter).forEach((item) => {
		if (
			typeof filter[item] === 'object' &&
			JSON.stringify(filter[item]) === '{}'
		) {
			delete filter[item];
		}

		if (filter[item] === undefined || filter[item] === null) {
			delete filter[item];
		}
	});

	return filter;
};
