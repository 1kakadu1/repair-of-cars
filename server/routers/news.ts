import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { INewsReqData, INewsSingleReqData, IResponse } from '../../@types';
import { NewsServices } from '../services/news.services';

const prisma = new PrismaClient();

export const news = async (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<{}, string, INewsReqData | INewsSingleReqData>>
) => {
	const newsService = new NewsServices(prisma);
	const limit = req.query['limit'] ? Number(req.query['limit']) : 10;
	const offset = req.query['offset'] ? Number(req.query['offset']) : 0;
	const slug: string | string[] | null | undefined = req.query['slug'];

	if (req.method === 'GET' && typeof slug === 'string' && slug && slug !== '') {
		try {
			const news = await newsService.get(slug);

			if (news.data === undefined) {
				throw new Error('404. Product not found');
			}

			const newsList = await newsService.getList({
				where: {
					id: {
						not: news.data.id,
					},
				},
				take: 3,
				skip: 0,
			});

			return res.status(200).json({
				data: {
					news: news.data,
					similar: newsList.data,
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
			const news = await newsService.getList({
				take: limit,
				skip: offset,
			});

			return res.status(200).json({
				data: {
					news: news.data,
					total: news.total,
					options: {
						limit: 10,
						offset: 0,
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

	if (req.method === 'POST') {
		try {
		} catch (error: any) {}
	}

	return res.status(404).json({
		error: 'Not found',
	});
};
