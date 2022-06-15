import { useEffect, useRef, useState } from "react";
import { Container } from "../container/container.component";
import { ArrowMenuIcon } from "../icons/arrow-down.icon";
import { PortalWrapper } from "../portal-wrapper/portal-wrapper.container";
import { IMenuProps, IMenuSubProps } from "./menu.model";
import styles from "./menu.module.scss";
import Image from 'next/image';
import Link from "next/link";
import { ButtonBurger } from "../buttons/burger/burger.component";
import { IconArrowLeft } from "../icons/arrow-left.icon.component";

const MenuSub = ({links, open, active, onClose}: IMenuSubProps)=>{
    return(
        <PortalWrapper wrapperId="react-portal-menu">
                    <div className={`${styles.menu__full} ${open ? styles.menu__full_active : ""}`}>
                        <Container paddingNull className={styles.posRelative}>
                            <>
                            <div className={styles.closeSubMenu} onClick={onClose}>
                                <IconArrowLeft />
                            </div>
                            {
                                links.filter(item=> item.subMenu !== undefined).map((parent)=>{
                                    const itemsPreview = parent.subMenu?.filter(item=> item.preview !== undefined) || [];
                                    const itemsDefault = parent.subMenu?.filter(item=> item.preview === undefined) || [];

                                    return (
                                        <div className={`${styles.menu__full__parent}  ${
                                            active === parent.href ? styles.menu__full__parent_show : ''
                                        }`} key={"parent"+parent.href}>
                                            {
                                                itemsPreview.length > 0 && (
                                                    <div className={styles.menu__full__parent__item}>
                                                        {
                                                            itemsPreview.map((item)=>(

                                                                    <div className={styles.menuSubitem} key={item.href}>
                                                                        {
                                                                            item.preview && (
                                                                                <div className={styles.menuSubitemPreview}>
                                                                                    <Image
                                                                                        src={item.preview}
                                                                                        alt={item.name}
                                                                                        width="100%"
                                                                                        height="100%"
                                                                                    />
                                                                                </div>
                
                                                                            )
                                                                        }

                                                                        <Link href={parent.href+item.href} >
                                                                            <a className={styles.menuSubitemInfo} >
                                                                                <div className={styles.menuSubitemInfoTitle} >
                                                                                    {item.name}
                                                                                </div>
                                                                                <div className={styles.menuSubitemInfoDesc} >
                                                                                    {item.description || ""}
                                                                                </div>    
                                                                            </a>  
                                                                        </Link>
                                                                    </div>
                                                            
                                                            
                                                                
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                            
                                            <div className={styles.menu__full__parent__item + " "+ (itemsPreview.length > 0 ? styles.menu__full__parent__item_pdLeft : "")}>
                                                {itemsDefault.map((item)=>(
                                                     <Link href={parent.href+item.href} key={item.href}>
                                                        <a className={styles.menuSubitem+" "+styles.menuSubitemLink} key={item.href}>
                                                            {item.name}
                                                        </a>
                                                     </Link>
                                                ))}
                                            </div>

                                        </div>
                                    )
                                })
                            }
                            </>
                        </Container>
                    </div>
                
			</PortalWrapper>
    )
}

export const Menu = ({links}: IMenuProps)=>{
    const [active, setActive] = useState<string>(links[0].href || '');
	const [open, setOpen] = useState<string>('');

	const onToggle = (value: string) => {
		if (open === '') {
			setOpen(value);
			setActive(value);
		} else if (value === active && open !== '') {
			setOpen('');
		} else {
			setActive(value);
		}
	};

    const [mobileMenu, setMobileMenu] = useState<boolean>(false);
	const bodyRef = useRef<HTMLElement | null>();

	const onToggleMobile = (value: boolean) => {
		setMobileMenu(value);
	};

	useEffect(() => {
		bodyRef.current = document.querySelector('body');
		return () => {
			if (bodyRef.current) bodyRef.current.style.overflow = '';
		};
	}, []);

	useEffect(() => {
		if (bodyRef.current)
			if (open) {
				bodyRef.current.style.overflow = 'hidden';
			} else {
				bodyRef.current.style.overflow = '';
			}
	}, [open]);
    
    return(
        <div className={styles.menu}>

            <div className={styles.menuBtn}>
				<ButtonBurger open={mobileMenu} onToggle={onToggleMobile} />
			</div>
            <div className={styles.menu__list__wrap + " " + (mobileMenu ? styles.menu__list__wrap__mobile__active:"")}>
                <ul className={styles.menu__list +" container"}>
                    {
                        links.map((item)=>(
                            <li className={`${styles.menu__item} link ${
                                active === item.href && open !== ''
                                    ? styles.menu__item_active
                                    : ''
                            }`} key={item.href} onClick={()=> item.subMenu ? onToggle(item.href) : 0}>
                                <span className={`${styles.menu__title}`}>{item.name}</span>
                                {
                                    item.subMenu && (
                                        <span className={`${styles.menu__arrow}`}>
                                            <ArrowMenuIcon/>
                                        </span>
                                    )
                                }

                            </li>
                        ))
                    }
                </ul>
            </div>

            
            <MenuSub 
                open={open}
                active={active}
                onClose={()=> setOpen('')}
                links={links}
            />
            
        </div>

    )
}