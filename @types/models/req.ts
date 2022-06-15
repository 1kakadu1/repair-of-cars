import { ICategoryData } from "./category";
import { INewsData } from "./news";
import { IProductData } from "./product";
import { IServicesData } from "./services";

export interface ReqOptions{
    limit: number;
    offset: number;
    orderBy?: ReqOptionsOrderType;
}

export type ReqOptionsOrderType = "asc" | "desc";

export interface HomeData{
    services: IServicesReqData;
    products: IProductReqData
}

export interface IServicesReqData{
    data: IServicesData[],
    meta?:{
        title: string;
    }
    options:ReqOptions;
    total: number;
}

export interface INewsReqData{
    news: INewsData[],
    meta?:{
        title: string;
    }
    options:ReqOptions;
    total: number;
}

export interface ICategoryReqData{
    category: ICategoryData[],
    meta?:{
        title: string;
    }
    options: ReqOptions;
    total: number;
}

export interface IProductReqData{
    products:  IProductData[]
    meta?:{
        title: string;
    }
    options: ReqOptions;
    total: number;
}

export interface IHomeReqData{
    products:{
        all: IProductData[],
        popular: IProductData[]
    }
    services: IServicesData[],
    news: INewsData[],
}

export interface IResponse<TMeta, TError, TData> {
    meta?: TMeta;
    error?: TError;
    data?: TData;
}