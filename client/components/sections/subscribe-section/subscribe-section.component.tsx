import React from 'react';
import { Subscription } from '../../subscription/subscription.component';
import { TextInfoBg } from '../text-info-bg/text-info.component';

export const SubscribeSection = () => {
	return (
		<section className="subscribe-section">
			<TextInfoBg background="/img/subscribe-min.jpeg">
				<>
					<h2 className="subscribe-section__title">
						Подпишись на рассылку и будь в курсе новостей!
					</h2>
					<div className="subscribe-section__input">
						<Subscription title="" onSend={(value: string) => void 0} write />
					</div>
				</>
			</TextInfoBg>
		</section>
	);
};
