import { IServicesData, ReqOptions } from '../../../../@types';

export interface IServicesState {
	isLoading: boolean;
	error: string;
	services: IServicesData[];
	isHydrate: boolean;
	options: ReqOptions;
	total: number;
}
