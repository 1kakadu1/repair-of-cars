import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ButtonDefault } from '../buttons/default/default.component';
import { FilterIcon } from '../icons/filter.icon';
import { IContainerAsideProps } from './container-aside.model';

export const ContainerAside = ({
	aside,
	content,
	position = 'left',
	sticky,
	height = 'full',
	shadow,
}: IContainerAsideProps) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		return () => {
			const body = document.body;
			body.style.overflow = '';
		};
	}, []);

	useEffect(() => {
		const body = document.body;
		if (open) {
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = '';
		}
	}, [open]);

	return (
		<div className="container-aside">
			<div className="container-aside__actions">
				<ButtonDefault
					className="container-aside__action-filter"
					outline
					onClick={() => setOpen(!open)}
				>
					<FilterIcon />
				</ButtonDefault>
			</div>
			<div
				className={`container-aside__left container-aside_order-${position} ${
					sticky ? 'container-aside_sticky' : ''
				} ${shadow ? 'container-aside_shadow_desktop' : ''} ${
					open ? 'container-aside_open' : ''
				}`}
			>
				{React.cloneElement(aside, {
					...aside.props,
					onClose: () => setOpen(false),
				})}
			</div>
			<div
				className={`container-aside__content container-aside_height-${height}`}
			>
				{content}
			</div>
		</div>
	);
};
