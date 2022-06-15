import {Category, Product , CarModel, Seasons, Manufacturers, GripSurfaces, FuelEfficiency, SpeedIndex, User} from "@prisma/client";

export interface IProductData extends Product{
    categories?: Category[],
    modeCarl?: CarModel;
    season?: Seasons;
    manufacturers?: Manufacturers;
    speedIndex?: SpeedIndex;
    fuelEfficiency?: FuelEfficiency;
    gripSurfaces?: GripSurfaces;
    comments?: ICommentData[];
}

export interface ICommentData{
    comment: string;
    user:{
        avatar: string;
        email: string;
    }
}

export enum FiltersProductKey {
	order = 'order',
	rangePrice = 'rangePrice',
	rating = 'rating',
	category = 'category',
}

export interface IProductFilter {
	[FiltersProductKey.order]?: TypeProductOrder;
	[FiltersProductKey.rangePrice]?: number[];
	[FiltersProductKey.rating]?: { [key: string]: string };
	[FiltersProductKey.category]?: { [key: string]: string };
}

export type TypeProductOrder = 'price-asc' | 'price-desc' | 'popular' | 'asc' | 'desc';