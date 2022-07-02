import type { NextApiRequest, NextApiResponse } from 'next';
import { IProductReqData, IProductSingleReqData, IResponse } from '../../../@types';
import { products } from '../../../server/routers/products';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<IResponse<{}, string, IProductReqData | IProductSingleReqData>>
) {
	return products(req, res);
}
