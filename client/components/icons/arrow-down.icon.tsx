import { IIconProps } from './icon.model';

export const ArrowMenuIcon = ({
	className = '',
	viewBox = '0 0 10 4',
}: IIconProps) => {
	return (
		<svg
			viewBox={viewBox}
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 0.724993L0.54236 0L5 2.91976L9.45764 0L10 0.724993L5 4L0 0.724993Z"
				fill="white"
			/>
		</svg>
	);
};
