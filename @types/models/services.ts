import { Services, Category } from '@prisma/client';

export enum FiltersServicesKey {
	order = 'order',
	category = 'category',
}

export interface IServicesData extends Services {
	categories?: Category[];
}
