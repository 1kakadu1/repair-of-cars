import { IProductData } from '../../../../@types';

export interface IProductState {
	isLoading: boolean;
	error: string;
	product?: IProductData;
	isHydrate: boolean;
	similar: {
		products: IProductData[];
		isLoading: boolean;
		error: string;
	};
}
