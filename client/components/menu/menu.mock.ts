import { IMenuItem } from "./menu.model";

export const menuMock: IMenuItem[] = [
    {
        name: 'Товары',
        href: '/products',
        subMenu: [
            {
                href: "?cat=car-tires",
                name: "Автомобильные шины",
                preview: "/img/menu/1.png",
                parentHref: '/products',
                description: `Летние Зимние Шипованые Фрикционные Б/у. R13 R14 R15 R16 R17 R18 R19 R20 `
            },
            {
                href: "?cat=cargo-tires",
                name: "Грузовые шины",
                preview: "/img/menu/2.png",
                parentHref: '/products',
                description: `Ведущие Универсальные Рулевые Прицеп Рулевые + прицеп. R22,5 R24 R21 R20 R19,5 R18 R19 R20`
            },
            {
                href: "?cat=motorcycle-tires",
                name: "Мотошины",
                preview: "/img/menu/3.png",
                parentHref: '/products',
                description: `Спорт Спорт-турист Чоппер/круйзер Эндуро Классика. R12 R13 R14 R15 `
            },
            {
                href: "?cat=accessories-tires",
                name: "Аксессуары для шин, дисков и шиномонтажа",
                parentHref: '/products',
            },
        ]
    },
    {
        name: 'Услуги',
        href: '/services',
        subMenu: [
            {
                href: "/tire",
                name: "Шиномонтаж",
                preview: "/img/menu/4.png",
                parentHref: '/services',
                description: `Ежедневно с 9:00 до 21:00, без перерывов. от 500 ₽`
            },
            {
                href: "/tire-2",
                name: "Ремонт и правка дисков",
                preview: "/img/menu/5.png",
                parentHref: '/services',
                description: `Ежедневно с 9:00 до 21:00, без перерывов. от 500 ₽`
            },
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