import { ICartData } from "../../../@types/models/cart";

export interface ICartModalProps {
	className?: string;
	portalID?: string;
	portal?: boolean;
}

export interface IModalCartProps {
	products: ICartData[];
	className?: string;
	onClose: () => void;
	open: boolean;
}
