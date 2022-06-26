import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCart } from '../../hooks/useCart';
import { useFavorite } from '../../hooks/useFavorite';
import { toProductsSelector } from '../../store/reducer/products/products.selector';
import { CardProduct } from '../cards/card-product/card-product.component';
import { Pagination } from '../pagination/pagination.component';
import { IProductsProps } from './products.model';
import Router, { useRouter } from 'next/router';
import cl from './products.module.scss';
import { createSearch } from '../../utils/href.utils';
import {
	fetchProductsList,
	toProductsAction,
} from '../../store/reducer/products/products.reducer';
import { SelectDefault } from '../inputs/selsect/select.component';
import { FiltersProductKey } from '../../../@types';
import { useAppDispatch } from '../../store/state';

export const ProductsGrid = ({}: IProductsProps) => {
	const { query } = useRouter();
	const page = query.page || 1;
	const search = JSON.parse(JSON.stringify(query));
	delete search['page'];

	const dispatch = useAppDispatch();
	const products = useSelector(toProductsSelector.products);
	const total = useSelector(toProductsSelector.total);
	const options = useSelector(toProductsSelector.options);
	const filters = useSelector(toProductsSelector.filter);
	const isHydrate = useSelector(toProductsSelector.isHydrate);

	const { cart, onAddItem } = useCart();
	const { onToggleFavorite, favorites } = useFavorite();

	const onChangePagination = (page: number) => {
		Router.push({
			pathname: '/products/' + page,
			search: createSearch(search),
		});
		dispatch(
			fetchProductsList({
				options: {
					limit: options.limit,
					offset: options.limit * (page - 1),
					orderBy: options.orderBy || 'asc',
				},
				body: {
					...search,
				},
			})
		);
	};

	const onChangeOrder = (value: any) => {
		dispatch(
			toProductsAction.changeProductsOptions({
				...options,
				orderBy: value,
			})
		);
		dispatch(
			fetchProductsList({
				options: {
					...options,
					orderBy: value,
				},
				body: {
					...filters,
				},
			})
		);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	useEffect(() => {
		if (isHydrate) {
			dispatch(
				fetchProductsList({
					options: {
						limit: options.limit,
						offset: options.limit * (Number(page) - 1),
						orderBy: options.orderBy || 'asc',
					},
					body: {
						...search,
					},
				})
			);
		}
	}, []);

	return (
		<div className={cl.products}>
			{products.length === 0 ? (
				<div className={cl.productsEmpty}>
					По данному запросу найдено 0 продуктов
				</div>
			) : (
				<>
					<div className={cl.productsHeader}>
						<SelectDefault
							value={options.orderBy || 'asc'}
							onChange={onChangeOrder}
							name={FiltersProductKey.order}
							id="filter-order"
							options={[
								{
									value: 'asc',
									name: 'Название по убыванию',
								},
								{
									value: 'desc',
									name: 'Название по возрастанию',
								},
							]}
							className={cl.productsSelect}
						/>
						<div className={cl.productsTotal}>Товаров: {total}</div>
					</div>
					<div className={`container__row ${cl.popularRowMgTop}`}>
						{products.map((item) => (
							<div
								className={`container__col-12 container__col-md-6 container__col-xl-4 container__col--stretch`}
								key={item.id}
							>
								<CardProduct
									product={item}
									onAdd={onAddItem}
									count={cart.find((x) => x.id === item.id)?.count}
									onFavorite={onToggleFavorite}
									isFavorite={!!favorites.find((x) => x.id === item.id)}
								/>
							</div>
						))}
					</div>
					<div className={cl.productsPagination}>
						<Pagination
							count={total}
							limit={options.limit}
							page={Number(page)}
							onChange={onChangePagination}
							search={createSearch(search)}
						/>
					</div>
				</>
			)}
		</div>
	);
};
