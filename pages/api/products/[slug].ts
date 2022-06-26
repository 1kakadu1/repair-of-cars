import type { NextApiRequest, NextApiResponse } from 'next';
import { IProductReqData, IResponse } from '../../../@types';
import { products } from '../../../server/routers/products';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<IResponse<{}, string, IProductReqData>>
) {
	return products(req, res);
}
