import React from 'react';
import classes from './divider.module.scss';

export const Divider = ({
	styles,
	className = '',
	ptb = 10,
}: {
	styles?: React.CSSProperties;
	className?: string;
	ptb?: 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35;
}) => {
	return (
		<div
			style={styles}
			className={`divider ${classes.divider} ${
				classes['dividerPaddingTopBottom' + ptb]
			}  ${className}`}
		></div>
	);
};
