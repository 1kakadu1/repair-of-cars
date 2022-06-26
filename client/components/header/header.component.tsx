import { useMemo } from 'react';
import { ICategoryData, RoutsPath } from '../../../@types';
import { useCart } from '../../hooks/useCart';
import { useFavorite } from '../../hooks/useFavorite';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Container } from '../container/container.component';
import { ArrowMenuIcon } from '../icons/arrow-down.icon';
import { CartIcon } from '../icons/cart.icon';
import { HeartIcon } from '../icons/heart.icon';
import { TireIcon } from '../icons/tire.icon';
import { Menu } from '../menu/menu.component';
import { menuMock, mobileMenu } from '../menu/menu.mock';
import styles from './header.module.scss';

export const Header = () => {
	const { width } = useWindowSize();
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

	menuMock[0].subMenu = menuCatProducts;
	menuMock[1].subMenu = menuCatServices;

	const menuLinks = width >= 1280 ? menuMock : [...menuMock, ...mobileMenu];
	const { onToggleCart } = useCart();
	const { onToggleWindowFavorite } = useFavorite();
	const onOpen = () => onToggleCart(true);
	const openFavorite = () => onToggleWindowFavorite(true);

	return (
		<header className={styles.header}>
			<Container paddingNull className={styles.header__container}>
				<div className={styles.header__menu}>
					<Menu links={menuLinks} />
				</div>

				<TireIcon className={styles.logo} />

				<div className={styles.header__actions}>
					<div className={styles.header__profile}>
						<span className={`${styles.header__profile__title}`}>Вход</span>
						<span className={`${styles.header__profile__arrow}`}>
							<ArrowMenuIcon />
						</span>
					</div>
					<div className={styles.header__item__action} onClick={openFavorite}>
						<HeartIcon />
					</div>
					<div className={styles.header__item__action} onClick={onOpen}>
						<CartIcon />
					</div>
				</div>
			</Container>
		</header>
	);
};
