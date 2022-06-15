import React, { useMemo } from 'react';
import { pageNumbers } from '../../utils/pagination.utils';
import { IPaginationProps } from './pagination.model';

export const Pagination = ({
	count,
	page,
	limit = 10,
	onChange,
	search,
	paginationOffset = 1,
	className = '',
}: IPaginationProps) => {
	const totalPages = Math.ceil(count / limit);
	const onChangePagination = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const target = e.currentTarget;
		const page = target.dataset['page'] || 0;
		onChange && onChange(Number(page), limit, search);
	};

	const pagination = useMemo(() => {
		return pageNumbers({
			currentPage: page,
			totalPages: totalPages,
			pageNeighbours: paginationOffset,
		});
	}, [page, totalPages, paginationOffset]);

	return (
		<div className={'pagination' + className}>
			<ul className="pagination-list">
				{pagination.LEFT_PAGE && (
					<li className={`pagination-list__item`}>
						<button
							className={`pagination__btn`}
							data-page={page - 1}
							onClick={onChangePagination}
						>
							<svg aria-hidden="true" viewBox="0 0 24 24">
								<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
							</svg>
						</button>
					</li>
				)}

				{pagination.pages.map((item, index: number) => {
					const sp1 =
						pagination.LEFT_PAGE && index === 0 ? (
							<span className={`pagination-list__item`}>...</span>
						) : undefined;
					const sp2 =
						pagination.RIGHT_PAGE && index + 1 === pagination.pages.length ? (
							<span className={`pagination-list__item`}>...</span>
						) : undefined;

					const li = (
						<li
							className={`pagination-list__item ${
								page === item ? 'pagination__item_active' : ''
							}`}
							key={item + 'pagination'}
						>
							{sp2}
							<button
								className={`pagination__btn ${
									page === item ? 'pagination__btn_active' : ''
								}`}
								data-page={item}
								onClick={onChangePagination}
							>
								{item}
							</button>
							{sp1}
						</li>
					);

					return li;
				})}

				{pagination.RIGHT_PAGE && (
					<li className={`pagination-list__item`}>
						<button
							className={`pagination__btn`}
							data-page={page + 1}
							onClick={onChangePagination}
						>
							<svg aria-hidden="true" viewBox="0 0 24 24">
								<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
							</svg>
						</button>
					</li>
				)}
			</ul>
		</div>
	);
};
