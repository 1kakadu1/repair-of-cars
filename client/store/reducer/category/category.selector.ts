import { createSelector } from '@reduxjs/toolkit';
import { createFeatureSelector } from '../../../utils/store.utils';
import { CATEGORY_KEY } from './category.const';
import { ICategoryState} from './category.model';

export const categorySelector =
	createFeatureSelector<ICategoryState>(CATEGORY_KEY);

const error = createSelector(categorySelector, ({ error }) => error);

const isLoading = createSelector(
	categorySelector,
	({ isLoading }) => isLoading
);

const category = createSelector(categorySelector, ({ category }) => category);

const total = createSelector(
	categorySelector,
	({ total }) => total
);

export const toCategorySelector = {
	isLoading,
	category,
	error,
	total,
};