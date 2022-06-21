import React from 'react';

export const CardWrapper = ({
	className = '',
	children,
	paddingNull,
	stretch,
	shadow = true,
}: {
	className?: string;
	children: JSX.Element | JSX.Element[];
	paddingNull?: boolean;
	stretch?: boolean;
	shadow?: boolean;
}) => {
	return (
		<div
			className={`card-wrapper ${className}${stretch ? ' stretch' : ''} ${
				paddingNull ? 'card-wrapper_padding-null' : ''
			} ${shadow === true ? 'card-wrapper_shadow' : ''}`}
		>
			{children}
		</div>
	);
};
