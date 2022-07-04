import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
import {
	IResponse,
	IServicesReqData,
	IServicesSingleReqData,
} from '../../@types';
import { ServicesServices } from '../services/services.services';
import { servicesCreateFilter } from '../utils/services.utils';

const prisma = new PrismaClient();

export const services = async (
	req: NextApiRequest,
	res: NextApiResponse<
		IResponse<{}, string, IServicesReqData | IServicesSingleReqData>
	>
) => {
	const serviceDB = new ServicesServices(prisma);
	const limit = req.query['limit'] ? Number(req.query['limit']) : 10;
	const offset = req.query['offset'] ? Number(req.query['offset']) : 0;
	const slug: string | string[] | null | undefined = req.query['slug'];
	const orderBy =
		req.query['orderBy'] && !Array.isArray(req.query['orderBy'])
			? req.query['orderBy']
			: 'asc';

	if (req.method === 'GET' && typeof slug === 'string' && slug && slug !== '') {
		try {
			const service = await serviceDB.get(slug);

			if (service.data === undefined) {
				throw new Error('404. Service not found');
			}

			return res.status(200).json({
				data: {
					services: service.data,
				},
			});
		} catch (error: any) {
			return res.status(error.status || '404').json({
				error: error.message.toString(),
			});
		}
	}
	if (req.method === 'GET') {
		try {
			const filter = servicesCreateFilter(req);
			const news = await serviceDB.getList({
				where: {
					...filter,
				},
				take: limit,
				skip: offset,
				orderBy: {
					title: orderBy as Prisma.SortOrder,
				},
			});

			return res.status(200).json({
				data: {
					services: news.data,
					total: news.total,
					options: {
						limit: limit,
						offset: offset,
					},
				},
			});
		} catch (error: any) {
			console.error('Server error', error);
			return res.status(error.status).json({
				error: error.message.toString(),
			});
		}
	}

	return res.status(404).json({
		error: 'Not found',
	});
};
