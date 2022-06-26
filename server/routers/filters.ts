import { NextApiRequest, NextApiResponse } from 'next';
import {
	DefaultPrice,
	IFilterProductReqData,
	IResponse,
	RATING,
} from '../../@types';
import { PrismaClient } from '@prisma/client';
import { FiltersServices } from '../services/filters.services';

const prisma = new PrismaClient();

export const filters = async (
	req: NextApiRequest,
	res: NextApiResponse<IResponse<{}, string, IFilterProductReqData>>
) => {
	if (req.method === 'GET') {
		try {
			const filtersServices = new FiltersServices(prisma);
			const filters = await filtersServices.getFilters();

			return res.status(200).json({
				data: {
					filters: {
						rating: RATING,
						price: {
							min: DefaultPrice.min,
							max: DefaultPrice.max,
						},
						...filters.data,
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
