import { Prisma, PrismaClient } from '@prisma/client';
import { IServicesData } from '../../@types';

export class ServicesServices {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getList<T extends Prisma.ServicesFindManyArgs>(
		args?: Prisma.SelectSubset<T, Prisma.ServicesFindManyArgs>
	): Promise<{ data: IServicesData[]; total: number }> {
		const argsDef = args ? { ...args } : {};
		const services = await this.prisma.services.findMany({ ...argsDef });
		const total = await this.prisma.services.count();
		const servicesData: IServicesData[] = [];
		for (let i = 0; i < services.length; i++) {
			const categories = await this.prisma.category.findMany({
				where: { product: { some: { productId: { in: services[i].id } } } },
			});
			servicesData.push({
				...services[i],
				categories,
			});
		}
		return {
			data: servicesData,
			total,
		};
	}

	async get<T extends Prisma.ServicesFindManyArgs>(
		slug: string,
		args?: Prisma.SelectSubset<T, Prisma.ServicesFindManyArgs>
	): Promise<{ data?: IServicesData; error?: string }> {
		const argsDef = args ? { ...args } : {};
		const services = await this.prisma.services.findFirst({
			...argsDef,
			where: { slug },
		});

		if (services === null || services === undefined) {
			return {
				error: '404. Services not found',
			};
		}

		const categories = await this.prisma.category.findMany({
			where: { product: { some: { productId: { in: services.id } } } },
		});

		return {
			data: {
				...services,
				categories,
			},
		};
	}
}
