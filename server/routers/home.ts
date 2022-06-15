import { NextApiRequest, NextApiResponse } from "next";
import { IHomeReqData, IResponse } from "../../@types";
import {PrismaClient } from "@prisma/client";
import { ProductServices } from "../services/product.services";
import { ServicesServices } from "../services/services.services";
import { NewsServices } from "../services/news.services";

const prisma = new PrismaClient();

export const home = async (
    req: NextApiRequest,
    res: NextApiResponse<IResponse<{}, string, IHomeReqData>>
  ) => {
    const productService = new ProductServices(prisma); 
    const servicesService = new ServicesServices(prisma);
    const newsService = new NewsServices(prisma); 
    
    if (req.method === 'GET') {

        try {
            const services = await servicesService.get({
              take: 10,
            });

            const news = await newsService.get({
              where:{
                isStock: true
              },
              take: 3,
            });
        
            const products = await productService.getList({take: 10});
        
            const productsAutomotive = await productService.getList({
              where:{categories: {some:{categoryId:{in: "category-automotive"}}}},
              take: 4,
            });
            const productsCargo = await productService.getList({
              where:{categories: {some:{categoryId:{in: "category-cargo"}}}},
              take: 4,
            });
            const productsMotorcycle = await productService.getList({
              where:{categories: {some:{categoryId:{in: "category-motorcycle"}}}},
              take: 4,
            });
        
        
            return res.status(200).json({
              data: {
                  products:{
                    all: products.data,
                    popular: [
                      ...productsAutomotive.data,
                      ...productsCargo.data,
                      ...productsMotorcycle.data,
                    ]
                  },
                  services: services.data,
                  news: news.data,
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