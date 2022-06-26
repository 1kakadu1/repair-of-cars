import { createSelector } from '@reduxjs/toolkit';
import { createFeatureSelector } from '../../../utils/store.utils';
import { CART_KEY } from './cart.const';
import { ICart } from './cart.model';

export const cartSelector = createFeatureSelector<ICart>(CART_KEY);

const isOpen = createSelector(cartSelector, ({ isOpen }) => isOpen);

const getCartProductByID = (id: string) =>
	createSelector(cartSelector, ({ products }) =>
		products.find((x) => x.id === id)
	);
const getTotalPrice = (id?: string) =>
	createSelector(cartSelector, ({ products }) => {
		let totalPrice = 0;
		const productsItems = id ? products.filter((x) => x.id === id) : products;

		productsItems.forEach((element) => {
			const price =
				typeof element.price === 'string'
					? parseInt(element.price)
					: element.price;
			totalPrice += price * element.count;
		});

		return totalPrice;
	});

const cart = createSelector(cartSelector, ({ products }) => products);

export const toCartSelector = {
	getCartProductByID,
	cart,
	isOpen,
	getTotalPrice,
};
