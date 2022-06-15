import type { NextApiRequest, NextApiResponse } from 'next'
import {Prisma, PrismaClient } from "@prisma/client";
import { ProductServices } from '../services/product.services';
import { IProductReqData, IResponse, ReqOptionsOrderType } from '../../@types';
import { productCreateFilter } from '../utils/products.utis';

const prisma = new PrismaClient();


export const products = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse<{}, string, IProductReqData>>
) => {
  const productService = new ProductServices(prisma); 
  
  if (req.method === 'GET') {
    
    const filter = productCreateFilter(req);
    const limit =  req.query["limit"] ?  Number(req.query["limit"]) : 10;
    const offset = req.query["offset"] ?  Number(req.query["offset"]) : 0;
    const orderBy = req.query["orderBy"] && !Array.isArray(req.query["orderBy"]) ?  req.query["orderBy"] : 'asc';
    console.log("filter start", req.query, filter)
    try {

        const products = await productService.getList({
          where: {
            ...filter,
          },
          take: limit,
          skip: offset,
          orderBy:{
            name: orderBy as Prisma.SortOrder
          }
        },
        {
          where: {
            ...filter,
          },
        }
        );
        
        return res.status(200).json({
          data: {
              products: products.data,
              total: products.total,
              options:{
                limit,
                offset,
                orderBy: orderBy as ReqOptionsOrderType
              }
          },
          
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
