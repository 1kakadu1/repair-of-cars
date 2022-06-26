import { IFilterProductData } from '../../../../@types';

export interface IFiltersState {
	isLoading: boolean;
	error: string;
	filters?: IFilterProductData;
}
