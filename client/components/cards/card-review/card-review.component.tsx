import React from 'react';
// import { Rating } from '../../rating/rating.component';
import Image from 'next/image'
import { ICardReviewProps } from './card-review.model';
import empty from "../../../assets/images/user/user-empty.png";
import moment from "moment";

export const CardReview = ({ review, className = '' }: ICardReviewProps) => {
	const dateMs = Date.parse(review.createdAt);
	const date = new Date(dateMs);
	const day = date.getDay() < 10 ? "0"+date.getDay() : date.getDay();
	const month = date.getMonth() +1 < 10 ? "0"+(date.getMonth() +1) :date.getMonth() +1;
	return (
		<div className={'card-review ' + className}>
			<div className="card-review-avatar">
				<Image
					layout='fill'
					src={review.user.avatar !== "" ? review.user.avatar : empty}
					alt=""
					objectFit='cover'
					objectPosition="center"
                />
			</div>
			<div className="card-review-info">
				<div className="card-review-info-header">
					<div className="card-review-info-header__name">
						{review.user.name}
					</div>
					<div className="card-review-info-header__date"> {day+"."+month+"."+date.getFullYear()}</div>
				</div>

				{/* <Rating
					id={review.id.toString()}
					size={3}
					selected={review.userStars || 0}
					onChangeRating={() => void 0}
					offChange
					width={21}
					className="card-review__stars"
				/> */}

				<div className="card-review__comment">{review.comment}</div>
			</div>
		</div>
	);
};
