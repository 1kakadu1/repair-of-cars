import { createSelector } from '@reduxjs/toolkit';
import { createFeatureSelector } from '../../../utils/store.utils';
import { PRODUCTS_KEY } from './products.const';
import { IProductsState } from './products.model';

export const productsSelector =
	createFeatureSelector<IProductsState>(PRODUCTS_KEY);

const error = createSelector(productsSelector, ({ error }) => error);
const isLoading = createSelector(
	productsSelector,
	({ isLoading }) => isLoading
);
const products = createSelector(productsSelector, ({ products }) => products);
const total = createSelector(productsSelector, ({ total }) => total);
const isHydrate = createSelector(
	productsSelector,
	({ isHydrate }) => isHydrate
);
const options = createSelector(productsSelector, ({ options }) => options);
const filter = createSelector(productsSelector, ({ filter }) => filter);
const productsLimit = (start: number, end: number) =>
	createSelector(productsSelector, ({ products }) =>
		products.slice(start, end)
	);
const getProductBySlug = (slug: string) =>
	createSelector(productsSelector, ({ products }) =>
		products.find((x) => x.slug === slug)
	);

export const toProductsSelector = {
	isLoading,
	products,
	error,
	filter,
	productsLimit,
	total,
	getProductBySlug,
	options,
	isHydrate,
};
