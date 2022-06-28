import { RoutsPath } from '../../../@types';
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
				href: RoutsPath.products+"/1",
				name: 'Товары',
				parentHref: '/',
			},
			{
				href: RoutsPath.news_to_page,
				name: 'Новости',
				parentHref: '/',
			},
			{
				href: RoutsPath.about,
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
