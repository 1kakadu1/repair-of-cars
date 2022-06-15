import React from 'react';

export const ButtonBurger = ({
	open,
	onToggle,
}: {
	open: boolean;
	onToggle: (value: boolean) => void;
}) => {
	const onClick = () => {
		onToggle(!open);
	};
	return (
		<div
			className={`hamburger-lines ${open ? 'active' : ''}`}
			onClick={onClick}
		>
			<span className="line line1"></span>
			<span className="line line2"></span>
			<span className="line line3"></span>
		</div>
	);
};
