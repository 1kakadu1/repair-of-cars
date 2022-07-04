import { useMemo } from 'react';
import { ICategoryData, RoutsPath } from '../../../@types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { menuMock, mobileMenu } from './menu.mock';
import { IMenuItem } from './menu.model';

export const useCreateCategoryMenu = ({ width }: { width?: number }) => {
	const menu: IMenuItem[] = JSON.parse(JSON.stringify(menuMock));
	const { category } = useTypedSelector((state) => state.category);

	const menuCatProducts = useMemo(() => {
		return category
			.filter((x: ICategoryData) => x.isProduct === true)
			.map((item: ICategoryData) => ({
				href: '/1' + `?category={"${item.id}":"${item.slug}"}`,
				name: item.name,
				preview: item.preview,
				parentHref: RoutsPath.products,
				description: item.description,
			}));
	}, [category]);

	const menuCatServices = useMemo(() => {
		return category
			.filter((x: ICategoryData) => x.isServices === true)
			.map((item: ICategoryData) => ({
				href: '/1' + `?category={"${item.id}":"${item.slug}"}`,
				name: item.name,
				preview: item.preview,
				parentHref: RoutsPath.services,
				description: item.description,
			}));
	}, [category]);

	menu[0].subMenu = menuCatProducts;
	menu[1].subMenu = menu[1].subMenu
		? [...menu[1].subMenu, ...menuCatServices]
		: menuCatServices;

	const menuLinks = width
		? width >= 1280
			? menu
			: [...menu, ...mobileMenu]
		: menu;

	return {
		menu: menuLinks,
	};
};
