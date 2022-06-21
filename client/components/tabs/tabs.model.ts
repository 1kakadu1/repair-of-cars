import { SwiperProps } from 'swiper/react';

export interface ITabs {
	swiperProps?: SwiperProps;
	className?: string;
	items: JSX.Element[];
	tab: number;
	update?: boolean;
}

export interface ITabsNavigation {
	className?: string;
	labels: { label: string; id: number | string; slug?: string; sectionId?: string | number}[];
	onChange: (tab: number) => void;
	tab: number;
	center?: boolean;
}

export interface ITabsContainer {
	className?: string;
	labels: { label: string; id: number | string ; slug?: string; sectionId?: string | number}[];
	items: JSX.Element[];
	init?: number;
	update?: boolean;
	tab?: number;
	onChangeTab?: (tab: number) => void;
	center?: boolean;
}
