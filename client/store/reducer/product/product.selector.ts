import { createSelector } from '@reduxjs/toolkit';
import { createFeatureSelector } from '../../../utils/store.utils';
import { PRODUCT_KEY } from './product.const';
import { IProductState } from './product.model';

export const productSelector =
	createFeatureSelector<IProductState>(PRODUCT_KEY);

const error = createSelector(productSelector, ({ error }) => error);
const isLoading = createSelector(productSelector, ({ isLoading }) => isLoading);
const product = createSelector(productSelector, ({ product }) => product);
const similar = createSelector(productSelector, ({ similar }) => similar);
const isHydrate = createSelector(productSelector, ({ isHydrate }) => isHydrate);

export const toProductSelector = {
	isLoading,
	product,
	error,
	isHydrate,
	similar,
};
