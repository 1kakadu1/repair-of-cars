import { createSelector } from '@reduxjs/toolkit';
import { createFeatureSelector } from '../../../utils/store.utils';
import { FAVORITE_KEY } from './favorite.const';
import { IFavoriteState } from './favorite.model';

export const favoriteSelector =
	createFeatureSelector<IFavoriteState>(FAVORITE_KEY);

const isOpen = createSelector(favoriteSelector, ({ isOpen }) => isOpen);

const getFavoritesByID = (id: string) =>
	createSelector(favoriteSelector, ({ favorites }) =>
		favorites.filter((x) => x.id === id)
	);

const getCartFavoriteByID = (id: string) =>
	createSelector(favoriteSelector, ({ favorites }) =>
		favorites.find((x) => x.id === id)
	);

const favorites = createSelector(
	favoriteSelector,
	({ favorites }) => favorites
);
const favoritesCount = createSelector(
	favoriteSelector,
	({ favorites }) => favorites.length
);

export const toFavoriteSelector = {
	getFavoritesByID,
	getCartFavoriteByID,
	favorites,
	isOpen,
	favoritesCount,
};
