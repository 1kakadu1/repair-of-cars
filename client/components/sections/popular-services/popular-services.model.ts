import { INewsData, IServicesData } from '../../../../@types';

export interface IPopularServices {
	posts: IServicesData[] | INewsData[];
	error?: string;
	loading?: boolean;
	title?: string;
	href: string;
	query?: string;
	hrefMore?: string;
}
