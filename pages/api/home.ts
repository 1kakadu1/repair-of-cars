import type { NextApiRequest, NextApiResponse } from 'next';
import { IHomeReqData, IResponse } from '../../@types';
import { home } from '../../server/routers/home';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IResponse<{}, string, IHomeReqData>>
) {
	return home(req, res);
}
