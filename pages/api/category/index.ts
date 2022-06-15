import type { NextApiRequest, NextApiResponse } from 'next'
import { ICategoryReqData,  IResponse } from '../../../@types';
import { category } from '../../../server/routers/category';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<{}, string, ICategoryReqData>>
) {
  return category(req, res);
}
