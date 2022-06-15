import { Prisma } from "@prisma/client";
import { NextApiRequest } from "next";
import { FiltersProductKey } from "../../@types";

export function productCreateFilter(req: NextApiRequest){
    const whereProduct: Prisma.ProductWhereInput = {};

    if(req.query[FiltersProductKey.rangePrice]){
      const price: [number, number] =  JSON.parse(req.query[FiltersProductKey.rangePrice] as string);

      whereProduct.price = {
        gte: price[0],
        lt: price[1],
      }
    }
    
    if(req.query[FiltersProductKey.category] && typeof req.query[FiltersProductKey.category] === 'string'){
        const catList = JSON.parse(req.query[FiltersProductKey.category] as string);
        const findIds = Object.keys(catList).map(item=> (item));
        whereProduct.categories = {
            some:{
                categoryId: {in: findIds}
            }
        }
    }

    if(req.query[FiltersProductKey.rating] && typeof req.query[FiltersProductKey.rating] === 'string'){
      const ratingList = JSON.parse(req.query[FiltersProductKey.rating] as string);

      const ratingValues = Object.values<string | number>(ratingList).map(item=> {
        let a = 1;
        if(typeof item === 'string'){
          a = parseInt(item);
        } else {
          a = item;
        }

        if(Number.isNaN(a)){
          a = 1
        }

        return a

      });
      whereProduct.rating = {
        in: ratingValues
      }
  }

    return whereProduct;
}