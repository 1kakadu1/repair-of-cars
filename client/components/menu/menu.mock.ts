import { IMenuItem } from "./menu.model";

export const menuMock: IMenuItem[] = [
    {
        name: 'Товары',
        href: '/products',
        order: 1,
        subMenu: [
            // {
            //     href: "?cat=accessories-tires",
            //     name: "Аксессуары для шин, дисков и шиномонтажа",
            //     parentHref: '/products',
            // },
        ]
    },
    {
        name: 'Услуги',
        href: '/services',
        subMenu: [
            // {
            //     href: "/tire",
            //     name: "Шиномонтаж",
            //     preview: "/img/menu/4.png",
            //     parentHref: '/services',
            //     description: `Ежедневно с 9:00 до 21:00, без перерывов. от 500 ₽`
            // },
            // {
            //     href: "/tire-2",
            //     name: "Ремонт и правка дисков",
            //     preview: "/img/menu/5.png",
            //     parentHref: '/services',
            //     description: `Ежедневно с 9:00 до 21:00, без перерывов. от 500 ₽`
            // },
       ]
    },
    {
        name: 'Компания',
        href: '/about',
        subMenu: [
            {
                href: "/company",
                name: "О компании",
                parentHref: '/about',
            },
       ]
    },
]

export const mobileMenu: IMenuItem[] =[
    {
        name: 'Профиль',
        href: '/profile',
    },
    {
        name: 'Корзина',
        href: '/cart',
    },
    {
        name: 'Избранное',
        href: '/favorite',
    }
]