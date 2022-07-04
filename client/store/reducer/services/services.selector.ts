import { createSelector } from '@reduxjs/toolkit';
import { createFeatureSelector } from '../../../utils/store.utils';
import { SERVICES_KEY } from './services.const';
import { IServicesState } from './services.model';

export const servicesSelector =
	createFeatureSelector<IServicesState>(SERVICES_KEY);

const error = createSelector(servicesSelector, ({ error }) => error);
const isLoading = createSelector(
	servicesSelector,
	({ isLoading }) => isLoading
);

const services = createSelector(servicesSelector, ({ services }) => services);

const total = createSelector(servicesSelector, ({ total }) => total);

const options = createSelector(servicesSelector, ({ options }) => options);

const isHydrate = createSelector(
	servicesSelector,
	({ isHydrate }) => isHydrate
);

export const toServicesSelector = {
	isLoading,
	services,
	error,
	total,
	options,
	isHydrate,
};
