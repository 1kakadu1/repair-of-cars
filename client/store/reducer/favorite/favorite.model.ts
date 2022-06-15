import { ICartData } from '../../../../@types/models/cart';

export interface IFavoriteData extends ICartData {}

export interface IFavoriteState {
	favorites: IFavoriteData[];
	isOpen: boolean;
}
