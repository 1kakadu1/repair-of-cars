import { Prisma } from '@prisma/client';
import { NextApiRequest } from 'next';
import { FiltersServicesKey } from '../../@types';

export function servicesCreateFilter(req: NextApiRequest) {
	const whereServices: Prisma.ServicesWhereInput = {};

	if (
		req.query[FiltersServicesKey.category] &&
		typeof req.query[FiltersServicesKey.category] === 'string'
	) {
		const catList = JSON.parse(
			req.query[FiltersServicesKey.category] as string
		);
		const findIds = Object.keys(catList).map((item) => item);
		whereServices.categories = {
			some: {
				categoryId: { in: findIds },
			},
		};
	}

	return whereServices;
}
