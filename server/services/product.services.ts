import { Prisma, PrismaClient } from "@prisma/client";
import { IProductData } from "../../@types";

export class ProductServices{
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async getList<T extends Prisma.ProductFindManyArgs, N extends Prisma.ProductFindManyArgs>(
        args?: Prisma.SelectSubset<T, Prisma.ProductFindManyArgs>,
        argsTotal?: Prisma.SelectSubset<N, Prisma.ProductFindManyArgs>
    ): Promise<{data: IProductData[], total: number}>{
        const argsDef = args ? {...args} : {include:{}}
        const argsTotalDef = argsTotal ? {...argsTotal} : {}
        const products = await this.prisma.product.findMany({...argsDef,  include: {
          ...argsDef.include,
          comments:            {
            select:{
              comment:true,
              user:{
                select:{
                  avatar: true,
                  email: true,
                }
              }
            }
          },
          modelCar: {
            select:{
              id: true,
              name: true
            }
          },
          season: {
            select:{
              id: true,
              name: true
            }
          },
          fuelEfficiency: {
            select:{
              id: true,
              name: true
            }
          },
          condition: {
            select:{
              id: true,
              name: true
            }
          },
          gripSurfaces: {
            select:{
              id: true,
              name: true
            }
          },
          manufacturers: {
            select:{
              id: true,
              name: true
            }
          },
          speedIndex: {
            select:{
              id: true,
              name: true
            }
          }
          
        },
      
      }
        );
        const total = await this.prisma.product.count({...argsTotalDef});
        const productsData: IProductData[] = [];
        for(let i = 0; i < products.length; i++){
          const categories = await this.prisma.category.findMany({
            where: { product: { some: { productId: { in:  products[i].id} }, }, },
          });
          productsData.push({
            ...products[i],
            categories
          });
        }
        return {
          data: productsData,
          total
        };
    }
  
}