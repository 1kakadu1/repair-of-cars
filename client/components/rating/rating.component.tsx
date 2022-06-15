import React, { useState } from 'react';
import { StarsRating } from 'stars-rating-react-hooks';

export const Rating = ({
	id,
	selected,
	onChangeRating,
	width,
	className = '',
	offChange = false,
}: {
	id: string;
	selected: number;
	onChangeRating?: (id: string, stars: number) => void;
	width?: number;
	className?: string;
	offChange?: boolean;
}) => {
	const [, setSelecting] = useState<{
		isSelecting: boolean;
		selectingValue: number;
	} | null>(null);

	const config = {
		totalStars: 5,
		initialSelectedValue: selected,
		// eslint-disable-next-line @next/next/no-img-element
		renderFull: <img alt="star" src="/img/star-active-min.png" style={{ width: width }} />,
		// eslint-disable-next-line @next/next/no-img-element
		renderEmpty: <img alt="star" src="/img/star-empty-min.png" style={{ width: width }} />,
		// eslint-disable-next-line @next/next/no-img-element
		renderHalf: <img alt="star" src="img/star-half-min.png" style={{ width: width }} />,
	};
	return (
		<div
			className={
				'stars-rating ' +
				className +
				(offChange ? ' stars-rating_off_event' : '')
			}
		>
			<StarsRating
				onStarsRated={(value: number) => {
					!offChange && onChangeRating && onChangeRating(id, value);
				}}
				onSelecting={(isSelecting: boolean, selectingValue: number) => {
					!offChange && setSelecting({ isSelecting, selectingValue });
				}}
				config={config}
			/>
		</div>
	);
};
