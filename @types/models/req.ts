import { ICategoryData } from './category';
import { IFilterProductData } from './filters';
import { INewsData } from './news';
import { IProductData } from './product';
import { IServicesData } from './services';

export interface ReqOptions {
	limit: number;
	offset: number;
	orderBy?: ReqOptionsOrderType;
}

export type ReqOptionsOrderType = 'asc' | 'desc';

export interface HomeData {
	services: IServicesReqData;
	products: IProductReqData;
}

export interface IServicesReqData {
	data: IServicesData[];
	meta?: {
		title: string;
	};
	options: ReqOptions;
	total: number;
}

export interface INewsReqData {
	news: INewsData[];
	meta?: {
		title: string;
	};
	options: ReqOptions;
	total: number;
}

export interface INewsSingleReqData {
	news: INewsData;
	similar?: INewsData[];
	meta?: {
		title: string;
	};
}

export interface ICategoryReqData {
	category: ICategoryData[];
	meta?: {
		title: string;
	};
	options: ReqOptions;
	total: number;
}

export interface IProductReqData {
	products: IProductData | IProductData[];
	meta?: {
		title: string;
	};
	options?: ReqOptions;
	total?: number;
}

export interface IProductSimilarReqData {
	products: IProductData[];
}

export interface IProductSimilarReqBody {
	options?: ReqOptions;
	product: IProductData;
}

export interface IHomeReqData {
	products: {
		all: IProductData[];
		popular: IProductData[];
	};
	services: IServicesData[];
	news: INewsData[];
}

export interface IFilterProductReqData {
	filters: IFilterProductData;
}

export interface IDictionariesReq<T> {
	data?: T;
	error?: string;
}

export interface IResponse<TMeta, TError, TData> {
	meta?: TMeta;
	error?: TError;
	data?: TData;
}
