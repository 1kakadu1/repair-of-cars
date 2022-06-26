import { Category } from '@prisma/client';

export interface ICategoryData extends Category {
	[key: string]: any;
}
