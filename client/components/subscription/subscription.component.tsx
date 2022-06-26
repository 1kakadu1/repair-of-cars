import React, { useContext, useState } from 'react';
import { isEmail } from '../../utils/validation';
import { Checkbox } from '../inputs/checkbox/checkbox.component';
import { InputDefault } from '../inputs/input-default/input-default.component';
import NotificationContext, {
	NotificationStatus,
} from '../notification-bar/notification-bar.context';
import { ISubscriptionProps } from './subscription.model';

export const Subscription = ({
	title,
	onSend,
	className = '',
	write,
}: ISubscriptionProps) => {
	const { updateNotification } = useContext(NotificationContext);
	const [agree, setAgree] = useState(false);

	return (
		<div className={'subscription subscription-container ' + className}>
			<div className="subscription__title">{title}</div>
			<div className="subscription__input">
				<InputDefault
					placeholder="Ваш Email"
					id="subscription"
					onSubmit={(value) => {
						onSend && onSend(value);
						updateNotification({
							message: 'Проблема работы сервера',
							status: NotificationStatus.error,
						});
					}}
					validation={(value) => {
						if (value === '') {
							return 'Поле обязательно для заполнения';
						}

						if (!isEmail(value)) {
							return 'Неверный email';
						}

						if (!agree) {
							return 'Необходимо принять соглашение';
						}

						return '';
					}}
					write={write}
				/>
			</div>
			<div className="subscription__checkbox">
				<Checkbox
					checked={agree}
					onChange={(value) => setAgree(value)}
					id="checkbox-subscription"
					name="subscription"
					label="Я прочитал Условия соглашения и согласен с условиями"
				/>
			</div>
		</div>
	);
};
