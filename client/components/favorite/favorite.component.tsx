import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { IFavoriteProps, IFavoriteModalProps } from './favorite.model';
import { CSSTransition } from 'react-transition-group';
import { IconArrowLeft } from '../icons/arrow-left.icon.component';
import { useFavorite } from '../../hooks/useFavorite';
import { CardCart } from '../cards/card-cart/card-cart.component';
import empty from '../../assets/images/empty-cart.svg';
import Image from 'next/image';

const Favorite = ({
	open,
	onClose,
	favorites,
	className = '',
}: IFavoriteProps) => {
	const { onRemove, onToggleWindowFavorite } = useFavorite();

	return (
		<CSSTransition
			in={open}
			timeout={300}
			classNames="favorite-fade"
			unmountOnExit
		>
			<div className={`favorite ${className}`}>
				<div className="favorite__header">
					<div className="favorite__title">Избранное</div>
					<div className="favorite__back" onClick={onClose}>
						<IconArrowLeft className="favorite__back-icon" />
					</div>
				</div>
				<div className="favorite__body">
					<div className="favorite__list">
						{favorites.map((item) => (
							<div className="favorite__list-item" key={item.id}>
								<CardCart
									data={item}
									onRemoveItem={onRemove}
									onClose={() => {
										onToggleWindowFavorite(false);
									}}
									href={'/product/' + item.slug}
								/>
							</div>
						))}
					</div>

					<div
						className={`favorite__empty${
							favorites.length === 0 ? ' show' : ''
						}`}
					>
						<div className="favorite__empty-preview-container">
							<Image
								layout="fill"
								src={empty}
								alt=""
								objectFit="cover"
								objectPosition="center"
							/>
						</div>
						У Вас еще нет товаров в избранном
					</div>
				</div>
			</div>
		</CSSTransition>
	);
};

const FavoriteOverlay = ({
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
			classNames="favorite-overlay-fade"
			unmountOnExit
		>
			<div className="favorite-overlay" onClick={onClose} />
		</CSSTransition>
	);
};

export const FavoriteModal = ({
	portalID = 'portal-favorite',
	...props
}: IFavoriteModalProps) => {
	const { onToggleWindowFavorite, open, favorites } = useFavorite();
	const onClose = () => onToggleWindowFavorite(false);
	const portalRef = useRef<HTMLElement | null>();
	const bodyRef = useRef<HTMLElement | null>();

	const InnerComponent = (
		<>
			<Favorite
				open={open}
				favorites={favorites}
				onClose={onClose}
				{...props}
			/>
			<FavoriteOverlay open={open} onClose={onClose} />
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

	return (
		<>
			{props.portal && portalRef.current
				? ReactDOM.createPortal(InnerComponent, portalRef.current)
				: InnerComponent}
		</>
	);
};
