import { createSelector } from '@reduxjs/toolkit';
import { createFeatureSelector } from '../../../utils/store.utils';
import { NEWS_KEY } from './news.const';
import { INewsState } from './news.model';

export const newsSelector = createFeatureSelector<INewsState>(NEWS_KEY);

const error = createSelector(newsSelector, ({ error }) => error);
const isLoading = createSelector(newsSelector, ({ isLoading }) => isLoading);
const news = createSelector(newsSelector, ({ news }) => news);
const isHydrate = createSelector(newsSelector, ({ isHydrate }) => isHydrate);
const total = createSelector(newsSelector, ({ total }) => total);
const options = createSelector(newsSelector, ({ options }) => options);

export const toNewsSelector = {
	isLoading,
	news,
	error,
	isHydrate,
	total,
};
