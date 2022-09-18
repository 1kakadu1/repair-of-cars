import type { NextPage } from 'next';
import { Container } from '../../client/components/container/container.component';
import { PageLayout } from '../../client/components/layout/page/page.component';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cl from './order.module.scss';
import { ContainerAside } from '../../client/components/container-aside/container-aside.component';
import { useContext, useState } from 'react';
import { ItemContact } from '../../client/components/order/item-contact.component';
import {
	radioListMock,
	radioListPaymentMock,
} from '../../client/components/order/order.mock';
import { CardOrder } from '../../client/components/cards/card-order/card-order.component';
import NotificationContext, {
	NotificationStatus,
} from '../../client/components/notification-bar/notification-bar.context';
import { Box } from '../../client/components/box/box.component';
import { Breadcrumbs } from '../../client/components/breadcrumbs/breadcrumbs.component';
import { Title } from '../../client/components/title/title';
import { ItemOrderLocation } from '../../client/components/order/item-order-location';
import { ItemOrderPayment } from '../../client/components/order/item-order-payment';

const validationSchema = yup.object({
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	name: yup.string().min(3, 'min len 3 char').required('Field is required'),
	surname: yup.string().min(3, 'min len 3 char').required('Field is required'),
	phone: yup.string().test('include', 'Введите верно телефон', (val) => {
		return val?.indexOf('_') === -1 ? true : false;
	}),
});

const Order: NextPage = (props) => {
	const { updateNotification } = useContext(NotificationContext);
	const [step, setStep] = useState({
		form: true,
		orderType: false,
		payType: false,
		payment: false,
	});

	const [orderAdr, setOrderAdr] = useState(radioListMock[0].value);
	const onChangeRadio = (value: string, id: string, name?: string) => {
		setOrderAdr(value);
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			surname: '',
			phone: '',
			email: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//alert(JSON.stringify(values, null, 2));
		},
	});

	const onOrder = (confirmEmail: boolean, confirmPolicy: boolean) => {
		if (confirmPolicy) {
			formik.validateForm(formik.values).then((errors: any) => {
				const isError = Object.keys(errors).length === 0;
				if (!isError) {
					updateNotification({
						message: 'Введите верно данные',
						status: NotificationStatus.error,
					});
				} else {
					updateNotification({
						message: 'Проблема работы сервера. Повторите через время',
						status: NotificationStatus.warning,
					});
				}
				setStep({ ...step, form: isError });
			});
			formik.handleSubmit();
		} else {
			updateNotification({
				message: 'Вы должны принять соглашение',
				status: NotificationStatus.warning,
			});
		}
	};

	return (
		<div>
			<PageLayout
				head={{
					title: 'Оформление заказа',
					description: 'Оформление заказа на сайте',
				}}
			>
				<>
					<Container>
						<Box styles={{ paddingTop: '20px' }} />
						<Breadcrumbs
							links={[
								{
									name: 'Оформление заказа',
								},
							]}
						/>

						<Title title={'Оформление заказа'} size={40} />
						<ContainerAside
							position="right"
							aside={<CardOrder disabled={false} onSubmit={onOrder} />}
							classNameAside={cl.orderAside}
							classNameActions={cl.orderActions}
							height="auto"
							content={
								<>
									<ItemContact
										formik={formik}
										isValid={step.form && step.orderType}
										changeStepValue={(value) =>
											setStep({ ...step, orderType: value })
										}
									/>

									<ItemOrderLocation
										disabled={!step.orderType}
										defaultClose={step.orderType === false ? undefined : false}
										onChangeRadio={onChangeRadio}
										radio={orderAdr}
										radioList={radioListMock}
										changeStepValue={(value) =>
											setStep({ ...step, payType: value })
										}
										isValid={step.payType}
									/>

									<ItemOrderPayment
										disabled={!step.payType}
										defaultClose={step.payType === false ? undefined : false}
										onChangeRadio={onChangeRadio}
										radio={orderAdr}
										radioList={radioListPaymentMock}
										changeStepValue={(value) => {
											formik.validateForm(formik.values).then((errors) => {
												setStep({
													...step,
													form: Object.keys(errors).length === 0,
													payment: value,
												});
											});
											formik.handleSubmit();
										}}
										isValid={step.payment}
									/>
								</>
							}
							sticky
							shadow
						/>
					</Container>
					<Box styles={{ paddingTop: '60px' }} />
				</>
			</PageLayout>
		</div>
	);
};

export default Order;
