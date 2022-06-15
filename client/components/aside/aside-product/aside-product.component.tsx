import React, { useEffect, useRef, useState } from 'react';
import { IAsideProductProps } from './aside-product.model';
import { SlideDownCustom } from '../../slide-down/slide-down.component';
import { Aside } from '../aside.component';
import { ButtonDefault } from '../../buttons/default/default.component';
import { useDispatch, useSelector } from 'react-redux';
import { RangeSlider } from '../../inputs/range/range.component';
import { fetchProductsList, toProductsAction } from '../../../store/reducer/products/products.reducer';
import { toProductsSelector } from '../../../store/reducer/products/products.selector';
import { DefaultPrice, FiltersProductKey, IProductFilter, RATING, RoutsPath } from '../../../../@types';
import { useFilterUrl } from '../../../hooks/useFilterUrl.hook';
import { Checkbox } from '../../inputs/checkbox/checkbox.component';
import { toCategorySelector } from '../../../store/reducer/category/category.selector';
import { CloseIcon } from '../../icons/close.icon';
import { onChangeCheckbox } from '../../../utils/checkbox.utils';
import { newArray } from '../../../utils/functions';
import { filterUpdate } from '../../../utils/filter.utils';

export const AsideProduct = ({
	className = '',
	...props
}: IAsideProductProps) => {
	const dispatch = useDispatch();
	const filters = useSelector(toProductsSelector.filter);
	const options = useSelector(toProductsSelector.options);
	const [stateFilter, setStateFilter] = useState<IProductFilter>(filters);
	const pageMount = useRef(false);
	const category = useSelector(toCategorySelector.category);

	const onChangeFilter = (key: FiltersProductKey, value: any) =>
		setStateFilter({ ...stateFilter, [key]: value });

	const onChangeCategory = (checked: boolean, id?: string, value?: string) =>
		onChangeCheckbox<FiltersProductKey>(
			stateFilter.category || {},
			FiltersProductKey.category,
			onChangeFilter,
			id || '',
			checked,
			value
	);

	const onChangeRating = (checked: boolean, id?: string, value?: string) =>
		onChangeCheckbox<FiltersProductKey>(
			stateFilter.rating || {},
			FiltersProductKey.rating,
			onChangeFilter,
			id || '',
			checked,
			value
		);


	const onFilter = () => {
		dispatch(toProductsAction.productsFilter({ ...filters, ...stateFilter }));
		const filter = filterUpdate<IProductFilter>({ ...filters, ...stateFilter });
		dispatch(fetchProductsList(
			{
				options:{
					limit: options.limit,
					offset: 0,
				},
				body:{
					...filter
				}
			}
		) as any);
	};

	const onResetFilter = () => {
		setStateFilter({});
		dispatch(toProductsAction.productsFilter({}));
		dispatch(fetchProductsList(
			{
				options:{
					limit: 9,
					offset: 0,
				},
				body: undefined
			}
		) as any);
	};

	useEffect(()=>{
		pageMount.current = true;
	},[])

	useFilterUrl<IProductFilter>(
		RoutsPath.products,
		filters, 
		{
		setFilter: (values) => {
			setStateFilter(values);
			dispatch(toProductsAction.productsFilter(values));
		},
		pageMount: pageMount.current,
		changePage: 1,
	});



	return (
		<Aside onClose={props.onClose} open={props.open}>
			<div className={'aside-product' + className}>
				<div className="aside-slide-down">
					<div className="aside-slide-down__button aside-slide-down_align-items-center">
						<span>Фильтр товаров</span>
						<div>
							{Object.keys(filters).length > 0 && (
								<button
									className="btn-close btn-filter__cancel"
									onClick={onResetFilter}
								>
									<svg viewBox="0 0 24 24">
										<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM4 12c0-4.4 3.6-8 8-8 1.8 0 3.5.6 4.9 1.7L5.7 16.9C4.6 15.5 4 13.8 4 12zm8 8c-1.8 0-3.5-.6-4.9-1.7L18.3 7.1C19.4 8.5 20 10.2 20 12c0 4.4-3.6 8-8 8z"></path>
									</svg>
								</button>
							)}
							<button
								className="btn-close btn-filter__cancel btn-filter_hide"
								onClick={props.onClose}
							>
								<CloseIcon />
							</button>
						</div>

					</div>
				</div>
				<SlideDownCustom
					title="Цена"
					defaultClose={false}
					className="aside-slide-down"
				>
					<div className="aside-slide-down__list">
						<RangeSlider
							value={
								stateFilter.rangePrice || [DefaultPrice.min, DefaultPrice.max]
							}
							onChange={(value) => onChangeFilter(FiltersProductKey.rangePrice, value)}
							sliderProps={{
								max: DefaultPrice.max,
								min: DefaultPrice.min,
							}}
						/>
					</div>
				</SlideDownCustom>
				
				<SlideDownCustom
					title="Категории"
					defaultClose={true}
					className="aside-slide-down"
				>
						<div className="aside-slide-down__list checkbox-list">
							{category.map((item) => (
								<div className="checkbox-list__item" key={item.id}>
									<Checkbox
										id={item.id}
										value={item.slug}
										label={<span> {item.name}</span>}
										checked={
											stateFilter.category
												? stateFilter.category[item.id] !== undefined
												: false
										}
										onChange={onChangeCategory}
									/>
								</div>
							))}
						</div>
				</SlideDownCustom>

				

				<SlideDownCustom
					title="Рейтинг"
					defaultClose={true}
					className="aside-slide-down"
				>
					<div className="aside-slide-down__list">
						{RATING.map((item) => (
							<div className="checkbox-list__item" key={item.id}>
								<Checkbox
									id={item.id}
									value={item.rating.toString()}
									label={
										<div className="aside-filter__rating-label">
											<div className="rating-label-wrap">
												{newArray(item.rating).map((item) => (
													// eslint-disable-next-line @next/next/no-img-element
													<img src='/img/star-active-min.png' alt="" key={item} />
												))}
											</div>

											<span>{item.rating}/5</span>
										</div>
									}
									checked={
										stateFilter.rating
											? stateFilter.rating[item.id] !== undefined
											: false
									}
									onChange={onChangeRating}
								/>
							</div>
						))}
					</div>
				</SlideDownCustom>

				<ButtonDefault className="aside-button-filter" onClick={onFilter}>
					<span>Подобрать</span>
				</ButtonDefault>
			</div>
		</Aside>
	);
};
