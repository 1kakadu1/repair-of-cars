import { IOrderItemLocation } from '../../../@types';

export const radioListMock: IOrderItemLocation[] = [
	{
		value: '1',
		id: 'order-1',
		label: {
			title: 'Пролетарская улица, 132/5',
			subTitle: 'Ежедневно с 9:00 до 21:00, без перерывов',
		},
	},
	{
		value: '2',
		id: 'order-2',
		label: {
			title: 'ул. Пушкина, 12',
			subTitle: 'Ежедневно с 8:00 до 20:00, без перерывов',
		},
	},
	{
		value: '3',
		id: 'order-3',
		label: {
			title: 'ул. Пушкина, 156',
			subTitle: 'Ежедневно с 6:00 до 18:00, без перерывов',
		},
	},
];

export const radioListPaymentMock: IOrderItemLocation[] = [
	{
		value: '1',
		id: 'order-1',
		label: {
			title: 'Оплата на месте получения',
			subTitle: 'Доступны: наличный расчет или банковской картой',
		},
	},
];
