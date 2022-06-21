import React, { useContext, useRef, useState } from 'react';
import { ButtonDefault } from '../buttons/default/default.component';
import { CardReview } from '../cards/card-review/card-review.component';
import { Divider } from '../divider/divider.component';
import NotificationContext, {
	NotificationStatus,
} from '../notification-bar/notification-bar.context';
import { IReviewsProps } from './reviews.model';

export const Reviews = ({
	className = '',
	reviews,
	swiperRef,
}: IReviewsProps) => {
	const [isCreate, setCreate] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const { updateNotification } = useContext(NotificationContext);
	const auth = false;
	const onReviewsNew = () => {
		if (auth) {
			setCreate(!isCreate);
			if (!isCreate) {
				ref &&
					ref.current &&
					ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
				setTimeout(() => {
					swiperRef && swiperRef.update();
				}, 501);
			}
		} else {
			updateNotification({
				message: 'Вы не вошли в аккаунт!',
				status: NotificationStatus.warning,
			});
		}
	};
	return (
		<div className={'reviews ' + className}>
			<div className="reviews-create" ref={ref}></div>
			{reviews && reviews.length > 0 ? (
				<ul className="reviews-list">
					{reviews.map((item) => (
						<li key={item.id} className="reviews-list__item">
							<div className="reviews-list__item-review">
								<CardReview review={item} />
							</div>
							<Divider ptb={0} />
						</li>
					))}
				</ul>
			) : (
				<div className="reviews-empty">
					<span>
						У данного товара нет отзывов. Станьте первым, кто оставил отзыв об
						этом товаре!
					</span>
					<ButtonDefault className="reviews__add" onClick={onReviewsNew}>
						<span>Написать отзыв</span>
					</ButtonDefault>
				</div>
			)}
		</div>
	);
};
