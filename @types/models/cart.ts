export interface ICartData {
	title: string;
	preview: string;
	id: string;
	price: number | string;
	count: number;
	quantity: number;
	cat?: string;
	comments?: string;
	code: string | number;
	slug: string;
	[key: string]: unknown;
}

export interface ICartCommentsData {
	id: string;
	comments: string;
}