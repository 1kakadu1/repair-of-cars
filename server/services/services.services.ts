import { Prisma, PrismaClient } from "@prisma/client";
import { IProductData, IServicesData } from "../../@types";

export class ServicesServices{
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async get<T extends Prisma.ServicesFindManyArgs>(
        args?: Prisma.SelectSubset<T, Prisma.ServicesFindManyArgs>
    ): Promise<{data: IServicesData[], total: number}>{
        const argsDef = args ? {...args} : {}
        const services = await this.prisma.services.findMany({...argsDef});
        const total = await this.prisma.services.count();
        const servicesData: IServicesData[] = [];
        for(let i = 0; i < services.length; i++){
          const categories = await this.prisma.category.findMany({
            where: { product: { some: { productId: { in:  services[i].id} }, }, },
          });
          servicesData.push({
            ...services[i],
            categories
          });
        }
        return {
          data: servicesData,
          total
        };
    }
  
}