import { Router } from "next/router";


export function updateURL(
	history: Router,
	pathname: string,
	queryKey: string | number,
	queryValue: string | number
) {
	const currentSearch = queryParse(window.location.search);

	if (queryKey in currentSearch && queryValue === '') {
		delete currentSearch[queryKey];
	} else {
		currentSearch[queryKey] = queryValue;
	}

	const q = Object.keys(currentSearch || {})
		.map(function (key) {
			return key + '=' + currentSearch[key].toString();
		})
		.join('&');

	history.push({
		pathname: pathname,
		search: '?' + q,
	});
}

export const createSearch = (filter: { [key: string]: any }) => {
	return Object.keys(filter || {})
		.map(function (key) {
			if (typeof filter[key] === 'object' || Array.isArray(filter[key])) {
				console.log("createSearch",Array.isArray(filter[key]), filter[key])
				return `${key}=${JSON.stringify(filter[key])}`;
			}
			return key + '=' + filter[key];
		})
		.join('&');
};

export function queryParse(search: string) {
	let qd: { [key: string]: any } = {};

	if (search && search !== "?")
		search
			.substr(1)
			.split('&')
			.forEach(function (item) {
				let s = item.split('='),
					k = s[0],
					v = s[1] && decodeURIComponent(s[1]);
				try { 
					const parse =JSON.parse(v);
					if (typeof parse === 'object' || Array.isArray(parse)) {
						qd[k] = parse;
					} else {
						qd[k] = v;
					}
				} catch (e) {
					qd[k] = v;
				}
			});

	return qd;
}