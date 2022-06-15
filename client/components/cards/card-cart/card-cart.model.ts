import { ICartData } from "../../../../@types/models/cart";

export interface ICardCartProps{
    data: ICartData;
    onAddItem?: (value: ICartData) => void, 
    onSubItem?: (value: ICartData) => void, 
    onRemoveItem?: (value: string) => void
    href?: string;
}