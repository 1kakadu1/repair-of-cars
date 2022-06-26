import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Category } from '@prisma/client';
import { ICategoryReqData, IResponse } from '../../@types';
import { NewsServices } from '../services/news.services';
import { CategoryServices } from '../services/category.services';

const prisma = new PrismaClient();

export const category = async (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<{}, string, ICategoryReqData>>
) => {
	const catService = new CategoryServices(prisma);

	if (req.method === 'GET') {
		try {
			const catList = await catService.getList(
				{
					where: {
						//isProduct: true,
						published: true,
					},
					select: {
						id: true,
						slug: true,
						name: true,
						preview: true,
						description: true,
						isProduct: true,
						isServices: true,
					},
				},
				{
					where: {
						isProduct: true,
					},
				}
			);

			return res.status(200).json({
				data: {
					category: catList.data,
					total: catList.total,
					options: {
						limit: catList.total,
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
	} else {
		return res.status(404).json({
			error: 'Not found',
		});
	}
};
