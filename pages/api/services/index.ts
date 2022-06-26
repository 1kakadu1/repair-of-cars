import type { NextApiRequest, NextApiResponse } from 'next';
import { services } from '../../../server/routers/services';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	services(req, res);
}
