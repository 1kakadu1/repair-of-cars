import { ICartData } from "../../../../@types/models/cart";

export interface ICart {
	products: ICartData[];
	isOpen: boolean;
}

