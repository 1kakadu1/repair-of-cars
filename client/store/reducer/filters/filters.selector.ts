import { createSelector } from '@reduxjs/toolkit';
import { createFeatureSelector } from '../../../utils/store.utils';
import { FILTERS_KEY } from './filters.const';
import { IFiltersState } from './filters.model';

export const filtersSelector =
	createFeatureSelector<IFiltersState>(FILTERS_KEY);

const error = createSelector(filtersSelector, ({ error }) => error);
const isLoading = createSelector(filtersSelector, ({ isLoading }) => isLoading);
const filters = createSelector(filtersSelector, ({ filters }) => filters);

export const toProductSelector = {
	isLoading,
	filters,
	error,
};
