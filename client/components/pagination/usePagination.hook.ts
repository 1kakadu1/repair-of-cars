import Router, { useRouter } from 'next/router';
import { useCallback } from 'react';
import { createSearch } from '../../utils/href.utils';

export const usePagination = ({
	pathname,
	onChangePagination,
}: {
	pathname: string;
	onChangePagination: (page: number, search?: { [key: string]: any }) => void;
}): {
	page: number;
	search: { [key: string]: any };
	onPaginationChange: (page: number, search?: { [key: string]: any }) => void;
} => {
	const { query } = useRouter();

	const search = JSON.parse(JSON.stringify(query));
	delete search['page'];

	const page =
		query.params &&
		query.params[0] &&
		typeof Number(query.params[0]) === 'number'
			? Number(query.params[0])
			: 1;

	const onChange = useCallback(
		(toPage: number, filter?: { [key: string]: any }) => {
			const q =
				filter === undefined
					? search !== undefined && search !== '?'
						? createSearch(search)
						: undefined
					: createSearch(filter);
			Router.push({
				pathname: pathname + '/' + toPage,
				search: q,
			});
			onChangePagination(toPage, search);
		},
		[query, page]
	);

	return {
		onPaginationChange: onChange,
		page,
		search,
	};
};
