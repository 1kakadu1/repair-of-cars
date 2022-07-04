import type { NextApiRequest, NextApiResponse } from 'next';
import {
	IResponse,
	IServicesReqData,
	IServicesSingleReqData,
} from '../../../@types';
import { services } from '../../../server/routers/services';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		IResponse<{}, string, IServicesReqData | IServicesSingleReqData>
	>
) {
	services(req, res);
}
