import type { NextApiRequest, NextApiResponse } from 'next'
import {Prisma, PrismaClient } from "@prisma/client";
import { ProductServices } from '../services/product.services';
import { IProductData, IProductReqData, IResponse, ReqOptionsOrderType } from '../../@types';
import { productCreateFilter } from '../utils/products.utis';

const prisma = new PrismaClient();


export const products = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse<{}, string, IProductReqData>>
) => {
  const productService = new ProductServices(prisma); 

  const slug: string | string[] | null | undefined = req.query["slug"];
  const limit =  req.query["limit"] ?  Number(req.query["limit"]) : 10;
  const offset = req.query["offset"] ?  Number(req.query["offset"]) : 0;
  const orderBy = req.query["orderBy"] && !Array.isArray(req.query["orderBy"]) ?  req.query["orderBy"] : 'asc';

  if (req.method === 'GET' && slug !== null && slug !== undefined && !Array.isArray(slug) && typeof slug === "string") {
    
    try {

        if(slug === undefined && slug === ""){
          throw new Error("Wrong params");
        }

        const products = await productService.get({
            where: {
              slug: slug,
            },
          },
        );

        if(products.data === undefined){
          throw new Error("404. Product not found");
        }
    
        return res.status(200).json({
          data: {
              products: products.data,
          }, 
        })
        
      } catch (error: any) {
        console.error("Server error", error);
        return res.status(error.status || 404).json({
          error: error.message.toString()
        })
      }
    
    
  }
  
  if (req.method === 'GET') {
    
    const filter = productCreateFilter(req);

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
    
    
  }
  /*
    Похожие товары: body {limit, offset, orderBy, product: IProductData}
  */
 
  if (req.method === 'POST' && slug !== null && 
        slug !== undefined && !Array.isArray(slug) && 
        typeof slug === "string" && slug === "similar" && req.body['slug'] !== undefined
  ) {
    const productSlug: string = req.body['slug'];
    const take =  req.body['limit'] || limit;
    const skip =  req.body['offset'] || offset;

    const {data: product, error} = await productService.get({
      where: {
        slug: productSlug,
      },
    });

    if(error){
      return res.status(404).json({
        error: error
      })
    }
    if(product){
      const filter: Prisma.ProductWhereInput = {
        seasonId:{
          equals: product.seasonId
        },
        modeCarlId:{
          equals: product.modeCarlId
        }
      };
  
      try {
  
        const productList = await productService.getList({
            where: {
              ...filter,
              id:{
                not: product.id
              }
            },
            take,
            skip,
            orderBy:{
              name: orderBy as Prisma.SortOrder
            }
          }
        );
  
        return res.status(200).json({
          data: {
              products: productList.data,
          },
          
        })
  
      } catch (error: any) {
        console.error("Server error", error);
        return res.status(error.status).json({
          error: error.message.toString()
        })
      }
    }
    

  }

  return res.status(404).json({
      error: "Not found"
  })


  
}
