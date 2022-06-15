import { Prisma, PrismaClient } from "@prisma/client";
import moment from "moment";
import {  INewsData } from "../../@types";

export class NewsServices{
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async get<T extends Prisma.NewsFindManyArgs>(
        args?: Prisma.SelectSubset<T, Prisma.NewsFindManyArgs>
    ): Promise<{data: INewsData[], total: number}>{
        const argsDef = args ? {...args} : {}
        const news = await this.prisma.news.findMany({...argsDef});
        const total = await this.prisma.news.count();
        const servicesData: INewsData[] = [];
        for(let i = 0; i < news.length; i++){
          const categories = await this.prisma.category.findMany({
            where: { product: { some: { productId: { in:  news[i].id} }, }, },
          });
          servicesData.push({
            ...news[i],
            validUntil: moment(news[i].validUntil).locale('ru').format("DD MMM  YYYY"),
            categories
          });
        }
        return {
          data: servicesData,
          total
        };
    }
  
}