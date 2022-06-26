import { IMenuItem } from './menu.model';

export const menuMock: IMenuItem[] = [
	{
		name: 'Товары',
		href: '/products',
		order: 1,
		subMenu: [],
	},
	{
		name: 'Услуги',
		href: '/services',
		subMenu: [],
	},
	{
		name: 'Навигация',
		href: '/',
		subMenu: [
			{
				href: '/',
				name: 'Главная',
				parentHref: '/',
			},
			{
				href: '/products/1',
				name: 'Товары',
				parentHref: '/',
			},
			{
				href: '/about',
				name: 'О нас',
				parentHref: '/',
			},
		],
	},
];

export const mobileMenu: IMenuItem[] = [
	{
		name: 'Профиль',
		href: '/profile',
	},
];
