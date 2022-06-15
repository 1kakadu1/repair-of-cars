import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { ButtonDefault } from '../../buttons/default/default.component';
import { ISliderItemInfoProps } from './slider-item-info.model';
import cl from "./slider-item-info.module.scss";
import Image from 'next/image'
import { Container } from '../../container/container.component';

export const SectionSliderInfo = ({  slides }: ISliderItemInfoProps) => {

	const pagination = {
		clickable: true,
		renderBullet: function (index: number, className: string) {
			return (
				`<span class="${className} ${cl.pagination}"></span>`
			);
		},
	};

	return (
		<div className="slider-info">
			
				<Swiper
					className={cl.slider + " "+ "slider-info"}
					autoHeight={true}
					slidesPerView={1}
					pagination={pagination}
					modules={[Pagination]}
				>
					{slides.map((item, index) => (
						<SwiperSlide key={'SwiperSlide-' + index}>
								<div className={cl.item}>
									<Container className={cl.containerRelative}>
										<div className={cl.info}>
											<div className={cl.title + " slider-info__animate"}>{item.title}</div>
											<div className={cl.desc}>
												{item.desc || ''}
											</div>
											<ButtonDefault
												outline
												link={item.href}
												className={cl.link+ " slider-info__animate"}
											>
												<span>Подробнее</span>
											</ButtonDefault>
										</div>	
									</Container>


									<div className={cl.preview}>
										<Image
											src={item.preview || ""}
											alt=""
											layout='fill'
											objectFit='cover'
											objectPosition="center"
										/>
									</div>

								</div>
						</SwiperSlide>
					))}
				</Swiper>
			
		</div>
	);
};
