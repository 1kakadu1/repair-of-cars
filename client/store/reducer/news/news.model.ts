import { INewsData, ReqOptions } from "../../../../@types";

export interface INewsState {
	isLoading: boolean;
	error: string;
	news: INewsData[];
	filter: INewsFilter;
	options: ReqOptions,
	total: number;
	

}

export enum FiltersServicesKey {
	order = 'order',
}

export interface INewsFilter {
	[FiltersServicesKey.order]?: TypeOrder;
}

export type TypeOrder = 'asc' | 'desc';