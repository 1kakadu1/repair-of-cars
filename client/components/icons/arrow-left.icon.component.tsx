import React from 'react';
import { IIconProps } from './icon.model';

export const IconArrowLeft = ({ className = '' }: IIconProps) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				fill="currentColor"
				d="M3.34517 8.83333L8.58925 14.0774L7.41074 15.2559L0.154816 8L7.41074 0.74408L8.58925 1.92259L3.34517 7.16667H15.5V8.83333H3.34517Z"
			/>
		</svg>
	);
};
