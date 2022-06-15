import React from 'react';

export const Box = ({
	children,
	className = '',
	styles,
}: {
	children?: JSX.Element;
	className?: string;
	styles?: React.CSSProperties;
}) => {
	return (
		<div className={'box-container ' + className} style={styles}>
			{children}
		</div>
	);
};
