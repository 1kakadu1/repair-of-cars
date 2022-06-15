import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICartData } from '../../@types/models/cart';
import { toCartAction } from '../store/reducer/cart/cart.reducer';
import { toCartSelector } from '../store/reducer/cart/cart.selector';

const CART_STORE_LOCAL = 'cart';

export const useCart = () => {
	const dispatch = useDispatch();
	const onAddItem = (product: ICartData) =>
		dispatch(toCartAction.add({ prod: product }));
	const onSubItem = (product: ICartData) =>
		dispatch(toCartAction.sub({ prod: product }));
	const onRemoveItem = (id: string) =>
		dispatch(toCartAction.remove({ id }));
	const onToggleCart = (toggle: boolean) => {
		dispatch(toCartAction.toggleCart(toggle));
	};

	const refInit = useRef<boolean>(false);

	const cart = useSelector(toCartSelector.cart);
	const counter = cart.length;
	const isOpen = useSelector(toCartSelector.isOpen);
	const totalPrice = useSelector(toCartSelector.getTotalPrice());

	useEffect(() => {
		if (refInit.current) {
			localStorage.setItem(CART_STORE_LOCAL, JSON.stringify(cart));
		}
	}, [cart, totalPrice, counter]);

	useEffect(() => {
		const localCart = localStorage.getItem(CART_STORE_LOCAL);
		if (cart.length === 0 && localCart !== null && localCart !== '[]') {
			dispatch(toCartAction.setCart({ prod: JSON.parse(localCart) }));
		}
		refInit.current = true;
	}, []);

	return {
		onAddItem,
		onSubItem,
		onRemoveItem,
		onToggleCart,
		cart,
		counter,
		isOpen,
		totalPrice,
		CART_STORE_LOCAL: CART_STORE_LOCAL,
	};
};
