import React from 'react';
import { IIconProps } from './icon.model';

export const IconArrowSmallRight = ({ className = '' }: IIconProps) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.25415 2.74582L5.07911 1.92086L10.1583 7.00001L5.07911 12.0792L4.25415 11.2542L8.50834 7.00001L4.25415 2.74582Z"
			/>
		</svg>
	);
};
