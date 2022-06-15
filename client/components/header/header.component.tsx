import { useCart } from "../../hooks/useCart";
import { useFavorite } from "../../hooks/useFavorite";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Container } from "../container/container.component";
import { ArrowMenuIcon } from "../icons/arrow-down.icon";
import { CartIcon } from "../icons/cart.icon";
import { HeartIcon } from "../icons/heart.icon";
import { LogoIcon } from "../icons/logo.icon";
import { SearchIcon } from "../icons/search.icon";
import { Menu } from "../menu/menu.component";
import { menuMock, mobileMenu } from "../menu/menu.mock";
import styles from "./header.module.scss";

export const Header = () =>{
    const {width} = useWindowSize();
    const menuLinks = width >= 1280 ? menuMock : [...menuMock,...mobileMenu];
    const {onToggleCart} = useCart();
    const {onToggleWindowFavorite} = useFavorite();
    const onOpen = ()=> onToggleCart(true);
    const openFavorite = ()=> onToggleWindowFavorite(true);

    return(
        <header className={styles.header}>
            <Container paddingNull className={styles.header__container}>
                <div className={styles.header__menu}>
                    <Menu
                        links={menuLinks}
                    />
                </div>

                <LogoIcon />

                <div className={styles.header__actions}>
                    <div className={styles.header__profile}>
                        <span className={`${styles.header__profile__title}`}>Вход</span>
                        <span className={`${styles.header__profile__arrow}`}>
                            <ArrowMenuIcon/>
                        </span>
                    </div>
                    <div className={styles.header__item__action}
                        onClick={openFavorite}
                    >
                        <HeartIcon />
                    </div>
                    <div className={styles.header__item__action}
                        onClick={onOpen}
                    >
                        <CartIcon />
                    </div> 
                </div>
                
            </Container>
        </header>
    )
}