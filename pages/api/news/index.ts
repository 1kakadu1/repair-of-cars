import type { NextApiRequest, NextApiResponse } from 'next';
import { IResponse, INewsReqData, INewsSingleReqData } from '../../../@types';
import { news } from '../../../server/routers/news';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IResponse<{}, string, INewsReqData | INewsSingleReqData>>
) {
	return news(req, res);
}
