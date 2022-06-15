import { Prisma, PrismaClient } from "@prisma/client";
import {  ICategoryData } from "../../@types";

export class CategoryServices{
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async getList<T extends Prisma.CategoryFindManyArgs, N extends Prisma.CategoryFindManyArgs>(
        args?: Prisma.SelectSubset<T, Prisma.CategoryFindManyArgs>,
        argsTotal?: Prisma.SelectSubset<N, Prisma.CategoryFindManyArgs>
    ): Promise<{data: ICategoryData[], total: number}>{
        const argsDef = args ? {...args} : {}
        const argsTotalDef = argsTotal ? {...argsTotal} : {}
        const category = await this.prisma.category.findMany({...argsDef});
        const total = await this.prisma.category.count({...argsTotalDef});

        return {
          data: category,
          total
        };
    }
  
}