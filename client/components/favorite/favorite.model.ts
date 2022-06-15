import { IFavoriteData } from '../../store/reducer/favorite/favorite.model';

export interface IFavoriteModalProps {
	className?: string;
	portalID?: string;
	portal?: boolean;
}

export interface IFavoriteProps {
	favorites: IFavoriteData[];
	className?: string;
	onClose: () => void;
	open: boolean;
}
