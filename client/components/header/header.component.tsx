import { useCart } from '../../hooks/useCart';
import { useFavorite } from '../../hooks/useFavorite';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Container } from '../container/container.component';
import { ArrowMenuIcon } from '../icons/arrow-down.icon';
import { CartIcon } from '../icons/cart.icon';
import { HeartIcon } from '../icons/heart.icon';
import { TireIcon } from '../icons/tire.icon';
import { Menu } from '../menu/menu.component';
import { useCreateCategoryMenu } from '../menu/menu.hook';
import styles from './header.module.scss';

export const Header = () => {
	const { width } = useWindowSize();
	const { menu } = useCreateCategoryMenu({
		width,
	});

	const { onToggleCart } = useCart();
	const { onToggleWindowFavorite } = useFavorite();
	const onOpen = () => onToggleCart(true);
	const openFavorite = () => onToggleWindowFavorite(true);

	return (
		<header className={styles.header}>
			<Container paddingNull className={styles.header__container}>
				<div className={styles.header__menu}>
					<Menu links={menu} />
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
