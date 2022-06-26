import type { NextApiRequest, NextApiResponse } from 'next';
import {
	IFilterProductReqData,
	IProductReqData,
	IResponse,
} from '../../../@types';
import { filters } from '../../../server/routers/filters';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<IResponse<{}, string, IFilterProductReqData>>
) {
	return filters(req, res);
}
