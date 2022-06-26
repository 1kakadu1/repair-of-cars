import { PrismaClient } from '@prisma/client';
import { DefaultPrice, IFilterProductData, RATING } from '../../@types';
import { DictionariesServices } from './dictionaries.services';

export class FiltersServices {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getFilters(): Promise<{ data?: IFilterProductData; error?: string }> {
		const dictionaries = new DictionariesServices(this.prisma);

		try {
			const filters = await dictionaries.getDictionaries();
			if (filters.error) {
				return {
					error: filters.error,
				};
			}

			return {
				data: {
					rating: RATING,
					price: {
						min: DefaultPrice.min,
						max: DefaultPrice.max,
					},
					...filters.data,
				},
			};
		} catch (error: any) {
			return {
				error: error.message.toString(),
			};
		}
	}
}
