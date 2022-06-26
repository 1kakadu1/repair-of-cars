import { useState, useContext } from 'react';
import { ButtonDefault } from '../../buttons/default/default.component';
import { InputDefault } from '../../inputs/input-default/input-default.component';
import { Modal } from '../../modal/modal.component';
import NotificationContext, {
	NotificationStatus,
} from '../../notification-bar/notification-bar.context';
import { IModalCallbackProps } from './modal-callback.model';
import InputMask from 'react-input-mask';
import { MASK_PHONE } from '../../../const/const';

const initForm = {
	phone: {
		value: '',
		valid: true,
		touch: false,
	},
	name: {
		value: '',
		valid: true,
		touch: false,
	},
};

export const ModalCallback = ({
	onSend: onSendProps,
	open,
	onToggleOpen,
}: IModalCallbackProps) => {
	const { updateNotification } = useContext(NotificationContext);

	//TODO: change to Formik
	const [form, setForm] = useState<{
		phone: { value: string; valid: boolean; touch: boolean };
		name: { value: string; valid: boolean; touch: boolean };
	}>(initForm);

	const onChangeValue = (value: string, key: 'phone' | 'name') => {
		let valid = true;

		if (value.indexOf('_') !== -1 && key === 'phone') {
			valid = false;
		}

		if (value.length < 4 && key === 'name') {
			valid = false;
		}

		setForm({
			...form,
			[key]: {
				value: value,
				valid,
				touch: true,
			},
		});
	};

	const onSend = () => {
		const values = JSON.parse(JSON.stringify(form));

		if (values.phone.touch && values.name.touch) {
			if (values.name.valid && values.phone.valid) {
				setForm(JSON.parse(JSON.stringify(initForm)));
				onSendProps &&
					onSendProps({ name: values.name.value, phone: values.phone.value });
				updateNotification({
					message: 'Сервер временно не  отвечает!',
					status: NotificationStatus.warning,
				});
			}
		} else {
			updateNotification({
				message: 'Заполните все поля',
				status: NotificationStatus.error,
			});
		}
	};
	return (
		<Modal
			open={open}
			onClose={() => onToggleOpen(false)}
			className={'modal-callback'}
		>
			<div className="form" onSubmit={() => void 0}>
				<div className="h3-title center">
					Оставьте свой номер и мы свяжемся с Вами !
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<InputMask
						mask={MASK_PHONE}
						value={form.phone.value}
						onChange={(e) => onChangeValue(e.target.value.toString(), 'phone')}
					>
						{
							//@ts-ignore
							(inputProps: any) => (
								<InputDefault
									id="phone"
									label="Ваш номер"
									type="tel"
									error={
										!form.phone.valid && form.phone.touch
											? 'Неверный формат телефона'
											: ''
									}
									placeholder={'+1 (___) ___-__-__'}
									write
									{...inputProps}
								/>
							)
						}
					</InputMask>

					<InputDefault
						id="name"
						label="Ваше имя"
						error={
							!form.name.valid && form.name.touch
								? 'Минимальная длина 4 символа'
								: ''
						}
						value={form.name.value}
						onChange={(e) => onChangeValue(e.target.value.toString(), 'name')}
						onFocus={() =>
							setForm({ ...form, name: { ...form.name, touch: true } })
						}
						write
					/>
					<ButtonDefault onClick={onSend}>
						<span>Заказать звонок</span>
					</ButtonDefault>
				</form>
			</div>
		</Modal>
	);
};
