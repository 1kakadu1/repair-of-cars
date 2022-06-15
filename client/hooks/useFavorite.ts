import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IFavoriteData } from '../store/reducer/favorite/favorite.model';
import { toFavoriteAction } from '../store/reducer/favorite/favorite.reducer';
import { toFavoriteSelector } from '../store/reducer/favorite/favorite.selector';
import { useDidUpdateEffect } from './useDidUpdateEffect';

const FAVORITE_STORE_LOCAL = 'favorite';

export const useFavorite = () => {
	const dispatch = useDispatch();
	const onToggleFavorite = (product: IFavoriteData) =>
		dispatch(toFavoriteAction.toggleFavorite({ product}));
	const onToggleWindowFavorite = (value: boolean) =>
		dispatch(toFavoriteAction.toggleWindow(value));
	const onRemove = (id: string)=> dispatch(toFavoriteAction.remove({id}));

	const favorites = useSelector(toFavoriteSelector.favorites);
	const open = useSelector(toFavoriteSelector.isOpen);

	const refInit = useRef<boolean>(false);

	useDidUpdateEffect(() => {
		if (refInit.current) {
			localStorage.setItem(FAVORITE_STORE_LOCAL, JSON.stringify(favorites));
		}
	}, [favorites]);

	useEffect(() => {
		const localCart = localStorage.getItem(FAVORITE_STORE_LOCAL);
		if (
			localCart !== null &&
			localCart !== '[]'
		) {
			dispatch(toFavoriteAction.setFavorite(JSON.parse(localCart)));
		}
		refInit.current = true;
	}, []);

	return {
		open,
		onToggleFavorite,
		favorites,
		onRemove,
		onToggleWindowFavorite,
		FAVORITE_STORE_LOCAL: FAVORITE_STORE_LOCAL,
	};
};
