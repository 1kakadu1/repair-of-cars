import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export const useFilterUrl = <T extends { [key: string]: any }>(
	pathname: string,
	filter: T,
	options?: {
		setFilter?: (value: { [key: string]: any }) => void;
		offUpdate?: boolean;
		unMountFilter?: () => void;
		pageMount?: boolean;
		changePage?: number | string
	}
) => {
	const {push, query} = useRouter();
	const searchObj  = JSON.parse(JSON.stringify(query));
	delete searchObj['page'];

	const search = "?"+createSearch(searchObj);
	const {pageMount, changePage} = options || {};
	const initRef = useRef(false);
	const [newSearch, setNewSearch] = useState('');
	const { offUpdate = false } = options || {};

	const updateUrl = (value: { [key: string]: any }) => {
		const q = createSearch(value);
		setNewSearch(q);
		push({
			pathname: pathname+"/"+(changePage ?  changePage : query["page"]),
			search: q === "" ? "" : '?' + q,
		});
	};

	useEffect(() => {
		if (initRef.current && !offUpdate && pageMount === true) {
			updateUrl(filter);
		} else{
			initRef.current = true;
		}

	}, [filter]);

	useEffect(() => {
		
		if (options && options.setFilter && search) {
			const filterMount = queryParse(search);
			setNewSearch(createSearch(filterMount));
			options.setFilter(filterMount);
		}
		return () => {
			if (options?.unMountFilter) {
				options?.unMountFilter();
			}
		};
	}, []);

	return {
		init: initRef.current,
		search: newSearch,
		updateUrl: updateUrl,
		queryParse: queryParse,
		createSearch: createSearch,
	};
};

const createSearch = (filter: { [key: string]: any }) => {
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

function queryParse(search: string) {
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
