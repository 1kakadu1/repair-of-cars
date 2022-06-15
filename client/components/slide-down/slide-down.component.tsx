import React, { useState } from 'react';
import { SlideDown } from 'react-slidedown';
import { IconArrowSmallRight } from '../icons/arrow-small-right.icon.component';

export const SlideDownCustom = ({
	children,
	title,
	classNameTitle = '',
	className = '',
	defaultClose = true,
}: {
	children: JSX.Element;
	title: string;
	classNameTitle?: string;
	className?: string;
	defaultClose?: boolean;
}) => {
	const [open, setOpen] = useState(defaultClose);

	return (
		<div className={'slide-dropdown ' + className}>
			<div
				className={'slide-dropdown__button ' + classNameTitle}
				onClick={() => setOpen(!open)}
			>
				{title}
				<IconArrowSmallRight
					className={`slide-dropdown__icon ${open ? 'open' : ''}`}
				/>
			</div>
			<SlideDown
				className={'pure-menu pure-menu-scrollable slide-dropdown__list'}
				closed={open}
			>
				{children}
			</SlideDown>
		</div>
	);
};
