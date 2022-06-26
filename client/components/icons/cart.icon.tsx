import { IIconProps } from './icon.model';

export const CartIcon = ({
	viewBox = '0 0 16 16',
	className = '',
}: IIconProps) => {
	return (
		<svg
			width="16"
			height="16"
			className={className}
			viewBox={viewBox}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 5.5H1.5L3.5 11.5H10.5L12.5 2.5H15" stroke="currentColor" />
			<rect x="4" y="13" width="2" height="2" rx="1" fill="currentColor" />
			<rect x="8" y="13" width="2" height="2" rx="1" fill="currentColor" />
		</svg>
	);
};
