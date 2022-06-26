import { IIconProps } from './icon.model';

export const OkIcon = ({
	className = '',
	viewBox = '0 0 16 16',
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
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13 5.37853L6.73588 11.7145C6.35953 12.0952 5.74934 12.0952 5.37299 11.7145L2 8.30282L3.36289 6.92429L6.05443 9.64671L11.6371 4L13 5.37853Z"
				fill="#12BB9D"
			/>
		</svg>
	);
};
