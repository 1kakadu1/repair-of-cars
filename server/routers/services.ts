import type { NextApiRequest, NextApiResponse } from 'next';
import {
	PrismaClient,
	Services,
	Category,
	ServicesCategory,
} from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
	data: Services[];
	cat: any;
	cat2: any;
};

export const services = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const products = await prisma.services.findMany({
		take: 10,
	});
	const categoriesServ = await prisma.servicesCategory.findMany({
		where: { serviceId: products[0].id },
	});
	const cat = await prisma.category.findMany({
		where: { id: { in: categoriesServ.map((item) => item.categoryId) } },
	});

	res.status(200).json({ data: products, cat: cat, cat2: categoriesServ });
};
