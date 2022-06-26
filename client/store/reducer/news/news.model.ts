import { INewsData, ReqOptions } from '../../../../@types';

export interface INewsState {
	isLoading: boolean;
	error: string;
	news: INewsData[];
	options: ReqOptions;
	total: number;
	isHydrate: boolean;
}
