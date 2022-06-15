import { IProductData } from "../../../../@types";
import { ICartData } from "../../../../@types/models/cart";
import { IFavoriteData } from "../../../store/reducer/favorite/favorite.model";

export interface ICardProductProps{
    product: IProductData;
    onAdd: (product: ICartData)=> void;
    onFavorite?: (favorite: IFavoriteData)=> void;
    count?: number;
    isFavorite?: boolean
}