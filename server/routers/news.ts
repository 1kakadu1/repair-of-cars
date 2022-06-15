import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient, Services, Category, ServicesCategory} from "@prisma/client";
import { INewsReqData, IResponse } from '../../@types';
import { NewsServices } from '../services/news.services';

const prisma = new PrismaClient();

export const services = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse<{}, string, INewsReqData>>
) => {
  const newsService = new NewsServices(prisma); 

  if (req.method === 'GET') {

      try {
          const news = await newsService.get({
            take: 10,
          });
      
          return res.status(200).json({
            data:{
              news: news.data,
              total: news.total,
              options:{
                limit: 10,
                offset: 0
              }
            }
          })
          
        } catch (error: any) {
          console.error("Server error", error);
          return res.status(error.status).json({
            error: error.message.toString()
          })
        }
      
      
    } else {
      return res.status(404).json({
          error: "Not found"
      })
    }
}
