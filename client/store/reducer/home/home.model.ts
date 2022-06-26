import {
	INewsData,
	IProductData,
	IServicesData,
	ReqOptions,
} from '../../../../@types';

export interface IHomeState {
	isLoading: boolean;
	error: string;
	products: {
		all: IProductData[];
		popular: IProductData[];
	};
	services: IServicesData[];
	news: INewsData[];
	isHydrate: boolean;
}
