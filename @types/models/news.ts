import { News, Category} from "@prisma/client";

export interface INewsData extends News{
    validUntil: any,
    categories?: Category[],
}