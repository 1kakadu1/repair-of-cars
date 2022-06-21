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
        
        const products = await this.prisma.product.findMany({...argsDef,  include: {
          ...argsDef.include,
          comments:            {
            select:{
              comment:true,
              id: true,
              createdAt: true,
              user:{
                select:{
                  avatar: true,
                  name: true,
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
          // season: {
          //   select:{
          //     id: true,
          //     name: true
          //   }
          // },
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
      const total = argsTotal ? await this.prisma.product.count({...argsTotal}) : 0;

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

    async get<T extends Prisma.ProductFindFirstArgs>(
      args?: Prisma.SelectSubset<T, Prisma.ProductFindFirstArgs>,
  ): Promise<{data?: IProductData, error?: string}>{
      const argsDef = args ? {...args} : {include:{}}

      const product = await this.prisma.product.findFirst({...argsDef,
        include: {
        ...argsDef.include,
        comments:            {
          select:{
            comment:true,
            id: true,
            createdAt: true,
            user:{
              select:{
                avatar: true,
                name: true,
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
        // season: {
        //   select:{
        //     id: true,
        //     name: true
        //   }
        // },
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

     
      if(product === null || product === undefined){
        return {
          error: "404. Product not found"
        }
      }
        const productsData = JSON.parse(JSON.stringify(product));
     
        const categories = await this.prisma.category.findMany({
          where: { product: { some: { productId: { in:  product?.id} }, }, },
        });

        productsData.categories = categories || [];
      
      return {
        data: productsData,
      };
  }
  
}