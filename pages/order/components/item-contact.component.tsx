import InputMask from 'react-input-mask';
import { SlideDownCustom } from '../../../client/components/slide-down/slide-down.component';
import { InputDefault } from '../../../client/components/inputs/input-default/input-default.component';
import { MASK_PHONE } from '../../../client/const/const';
import { ButtonDefault } from '../../../client/components/buttons/default/default.component';
import cl from '../order.module.scss';

export interface IItemContact {
	formik: any;
	changeStepValue: (value: boolean) => void;
	isValid: boolean;
}

export const ItemContact = ({
	formik,
	changeStepValue,
	isValid,
}: IItemContact) => {
	const onSend = () => {
		formik.validateForm(formik.values).then((errors: any) => {
			changeStepValue(Object.keys(errors).length === 0);
		});
		formik.handleSubmit();
	};

	return (
		<SlideDownCustom
			title="Контактная информация"
			step={1}
			disabled={false}
			defaultClose={false}
			isValid={isValid}
		>
			<div>
				<form className={cl.form}>
					<div className={cl.formRow}>
						<div className={cl.formRowColumn}>
							<InputDefault
								id="form-name"
								name="name"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								onFocus={() => formik.setSubmitting(false)}
								label="Ваше имя"
								write
								value={formik.values.name}
								error={
									formik.touched.name && formik.errors.name
										? formik.errors.name
										: undefined
								}
							/>
						</div>
						<div className={cl.formRowColumn}>
							<InputDefault
								id="form-surname"
								name="surname"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								onFocus={() => formik.setSubmitting(false)}
								label="Ваша фамилия"
								write
								value={formik.values.surname}
								error={
									formik.touched.surname && formik.errors.surname
										? formik.errors.surname
										: undefined
								}
							/>
						</div>
					</div>

					<div className={cl.formRow}>
						<div className={cl.formRowColumn}>
							<InputDefault
								id="form-email"
								name="email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								onFocus={() => formik.setSubmitting(false)}
								label="Ваш Email"
								write
								value={formik.values.email}
								error={
									formik.touched.email && formik.errors.email
										? formik.errors.email
										: undefined
								}
							/>
						</div>
						<div className={cl.formRowColumn}>
							<InputMask
								mask={MASK_PHONE}
								value={formik.values.phone}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								onFocus={() => formik.setSubmitting(false)}
							>
								{
									//@ts-ignore
									(inputProps: any) => (
										<InputDefault
											id="form-phone"
											label="Ваш номер"
											type="tel"
											name="phone"
											error={
												formik.touched.phone && formik.errors.phone
													? formik.errors.phone
													: undefined
											}
											placeholder={'+1 (___) ___-__-__'}
											write
											{...inputProps}
										/>
									)
								}
							</InputMask>
						</div>
					</div>

					<ButtonDefault className={cl.formButton} onClick={onSend}>
						К следующему этапу
					</ButtonDefault>
				</form>
			</div>
		</SlideDownCustom>
	);
};
