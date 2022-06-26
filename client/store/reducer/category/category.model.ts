import { ICategoryData, ReqOptions } from '../../../../@types';

export interface ICategoryState {
	isLoading: boolean;
	error: string;
	category: ICategoryData[];
	options: ReqOptions;
	total: number;
	isHydrate: boolean;
}
