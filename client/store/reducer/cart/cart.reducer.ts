import { createSlice } from '@reduxjs/toolkit';
import { ICartCommentsData, ICartData  } from '../../../../@types/models/cart';
import { CART_KEY } from './cart.const';
import { ICart} from './cart.model';

const setCart = (
	state: ICart,
	{ payload }: { payload: { prod: ICartData [] } }
) => {
	state.products = payload.prod;
};

const add = (
	state: ICart,
	{ payload }: { payload: { prod: ICartData } }
) => {
	const item = [...state.products].findIndex(
		(x) => x.id === payload.prod.id
	);

	if (item === -1) {
		state.products.push({
			...payload.prod,
			count: 1,
		});
	} else {
		state.products[item].count += 1;
	}
};

const sub = (
	state: ICart,
	{ payload }: { payload: { prod: ICartData } }
) => {
	const item = [...state.products].findIndex(
		(x) => x.id === payload.prod.id
	);

	if (item !== -1 && state.products[item].count - 1 > 0) {
		state.products[item].count -= 1;
	} else if (item !== -1 && state.products[item].count - 1 <= 0) {
		state.products.splice(item, 1);
	}
};

const remove = (
	state: ICart,
	{ payload }: { payload: { id: string; } }
) => {
	const item = [...state.products].findIndex(
		(x) => x.id === payload.id
	);

	if (item !== -1) {
		state.products.splice(item, 1);
	}
};

const clear = (state: ICart) => {
	state.products = [];
};

const changeComments = (
	state: ICart,
	{ payload }: { payload: ICartCommentsData }
) => {
	const item = [...state.products].findIndex(
		(x) => x.id === payload.id
	);

	if (item !== -1) {
		state.products[item].comments = payload.comments;
	}
};

const toggleCart = (state: ICart, { payload }: { payload: boolean }) => {
	state.isOpen = payload;
};

export const cartSlice = createSlice({
	name: CART_KEY,
	initialState: {
		isOpen: false,
		products: [],
	},
	reducers: {
		add,
		sub,
		clear,
		remove,
		changeComments,
		toggleCart,
		setCart,
	},
});

export const toCartAction = cartSlice.actions;
