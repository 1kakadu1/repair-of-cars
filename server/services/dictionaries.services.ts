import { CarModel, PrismaClient, Seasons } from '@prisma/client';
import {
	DefaultPrice,
	IDictionariesReq,
	IFilterProductData,
	RATING,
} from '../../@types';

export class DictionariesServices {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getCarModel(): Promise<IDictionariesReq<CarModel[]>> {
		try {
			const data = await this.prisma.carModel
				.findMany
				// {
				//     select: {
				//         id: true,
				//         name: true,
				//     },
				// }
				();
			return {
				data,
			};
		} catch (e: any) {
			return {
				error: e.message.toString(),
			};
		}
	}

	async getSeasons(): Promise<IDictionariesReq<Seasons[]>> {
		try {
			const data = await this.prisma.seasons.findMany();
			return {
				data,
			};
		} catch (e: any) {
			return {
				error: e.message.toString(),
			};
		}
	}

	async getDictionaries(): Promise<{
		data?: IFilterProductData;
		error?: string;
	}> {
		const season = await this.getSeasons();
		const carModel = await this.getCarModel();
		if (season.error || carModel.error) {
			return {
				error: season.error || carModel.error || 'Not work filter',
			};
		}
		try {
			return {
				data: {
					season: season.data,
					modelCar: carModel.data,
					rating: RATING,
					price: {
						min: DefaultPrice.min,
						max: DefaultPrice.max,
					},
				},
			};
		} catch (e: any) {
			return {
				error: e.message.toString(),
			};
		}
	}
}
