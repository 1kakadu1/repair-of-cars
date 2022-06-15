import React from 'react';

export const Container = ({
	children,
	fluid,
	paddingNull,
	className = '',
}: {
	children: JSX.Element | JSX.Element[];
	fluid?: boolean;
	paddingNull?: boolean;
	className?: string;
}) => {
	return (
		<div
			className={`container${fluid ? '-fluid' : ''} ${
				paddingNull ? 'container_padding_null' : ''
			} ${className}`}
		>
			{children}
		</div>
	);
};
