import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { IModalCartProps, ICartModalProps } from './modal-cart.model';
import { CSSTransition } from 'react-transition-group';
import { useCart } from '../../hooks/useCart';
import { IconArrowLeft } from '../icons/arrow-left.icon.component';
import { CardCart } from '../cards/card-cart/card-cart.component';
import empty from '../../assets/images/empty-cart.svg';
import Image from 'next/image';
import { ButtonDefault } from '../buttons/default/default.component';
import { useRouter } from 'next/router';

const Cart = ({ open, onClose, products, className = '' }: IModalCartProps) => {
	const { onAddItem, onSubItem, onRemoveItem, totalPrice, onToggleCart } =
		useCart();

	return (
		<CSSTransition in={open} timeout={300} classNames="cart-fade" unmountOnExit>
			<div className={`cart ${className}`}>
				<div className="cart__header">
					<div className="cart__title">Корзина</div>
					<div className="cart__back" onClick={onClose}>
						<IconArrowLeft className="cart__back-icon" />
					</div>
				</div>
				<div className="cart__body">
					<div className="cart__list">
						{products.map((item) => (
							<div className="cart__list-item" key={item.id}>
								<CardCart
									data={item}
									onAddItem={onAddItem}
									onRemoveItem={onRemoveItem}
									onSubItem={onSubItem}
									onClose={() => {
										onToggleCart(false);
									}}
									href={'/product/' + item.slug}
								/>
							</div>
						))}
					</div>

					<div className={`cart__empty${products.length === 0 ? ' show' : ''}`}>
						<div className="cart__empty-preview-container">
							<Image
								layout="fill"
								src={empty}
								alt=""
								objectFit="cover"
								objectPosition="center"
							/>
						</div>
						У Вас еще нет товаров в корзине
					</div>
				</div>
				{products.length !== 0 && (
					<div className="cart__footer">
						<ButtonDefault className="cart__footer-link" link={'/order'}>
							Оформит заказ
						</ButtonDefault>
						<div className="cart__total-wrap">
							<div className="cart__total-label">
								В корзине {products.length} товаров
							</div>
							<div className="cart__total-price">
								на сумму {totalPrice.toFixed(2)}
							</div>
						</div>
					</div>
				)}
			</div>
		</CSSTransition>
	);
};

const ModalCartOverlay = ({
	onClose,
	open,
}: {
	onClose: () => void;
	open: boolean;
}) => {
	return (
		<CSSTransition
			in={open}
			timeout={300}
			classNames="cart-overlay-fade"
			unmountOnExit
		>
			<div className="cart-overlay" onClick={onClose} />
		</CSSTransition>
	);
};

export const ModalCart = ({
	portalID = 'portal-cart',
	...props
}: ICartModalProps) => {
	const { onToggleCart, isOpen: open, cart } = useCart();

	const onClose = () => onToggleCart(false);
	const { pathname } = useRouter();
	const portalRef = useRef<HTMLElement | null>();
	const bodyRef = useRef<HTMLElement | null>();

	const InnerComponent = (
		<>
			<Cart open={open} products={cart} onClose={onClose} {...props} />
			<ModalCartOverlay open={open} onClose={onClose} />
		</>
	);

	useEffect(() => {
		portalRef.current = document.getElementById(portalID);
		bodyRef.current = document.querySelector('body');
		return () => {
			if (bodyRef.current) bodyRef.current.style.overflow = '';
		};
	}, []);

	useEffect(() => {
		if (bodyRef.current)
			if (open) {
				bodyRef.current.style.overflow = 'hidden';
			} else {
				bodyRef.current.style.overflow = '';
			}
	}, [open]);

	useEffect(() => {
		if (bodyRef.current) {
			bodyRef.current.style.overflow = '';
		}
		onToggleCart(false);
	}, [pathname]);

	return (
		<>
			{props.portal && portalRef.current
				? ReactDOM.createPortal(InnerComponent, portalRef.current)
				: InnerComponent}
		</>
	);
};
