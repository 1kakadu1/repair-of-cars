import { IProductData, IProductFilter, ReqOptions } from "../../../../@types";

export interface IProductsState {
	isLoading: boolean;
	error: string;
	products: IProductData[];
	filter: IProductFilter;
	options: ReqOptions,
	total: number;
	isHydrate: boolean;
}

