import { SwiperProps } from "swiper/react";
import { IProductData } from "../../../../@types";

export interface IPopularProducts{
    title: string;
    products: IProductData[] | {[key: string | number]: IProductData[]};
    tabsLabel?: { label: string; id: number | string; slug?: string; sectionId?: string}[];
    swiperProps?: SwiperProps; 
    link?: {title: string, href: string}
}