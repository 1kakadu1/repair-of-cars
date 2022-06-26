import { IServicesData, ReqOptions } from '../../../../@types';

export interface IServicesState {
	isLoading: boolean;
	error: string;
	services: IServicesData[];
	filter: IServicesFilter;
	options: ReqOptions;
	total: number;
}

export enum FiltersServicesKey {
	order = 'order',
}

export interface IServicesFilter {
	[FiltersServicesKey.order]?: TypeOrder;
}

export type TypeOrder = 'asc' | 'desc';
