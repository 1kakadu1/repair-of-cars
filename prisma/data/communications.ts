const catRefServices = [
	{
		servicesId: 'services-1',
		categoryId: 'category-service-tire',
	},
	{
		servicesId: 'services-2',
		categoryId: 'category-service-disk',
	},
	{
		servicesId: 'services-3',
		categoryId: 'category-service-tire',
	},
];

const catRefNews = [
	{
		servicesId: 'news-1',
		categoryId: 'category-news',
	},
	{
		servicesId: 'news-2',
		categoryId: 'category-news',
	},
	{
		servicesId: 'news-3',
		categoryId: 'category-news',
	},
	{
		servicesId: 'news-4',
		categoryId: 'category-news',
	},
];

const catRefProducts = [
	{
		servicesId: 'product-1',
		categoryId: 'category-tire',
	},
	{
		servicesId: 'product-2',
		categoryId: 'category-tire',
	},
	{
		servicesId: 'product-3',
		categoryId: 'category-tire',
	},
	{
		servicesId: 'product-4',
		categoryId: 'category-tire',
	},
	{
		servicesId: 'product-5',
		categoryId: 'category-tire',
	},
	{
		servicesId: 'product-11',
		categoryId: 'category-tire',
	},
	{
		servicesId: 'product-6',
		categoryId: 'category-tire',
	},
	{
		servicesId: 'product-12',
		categoryId: 'category-tire',
	},
	{
		servicesId: 'product-13',
		categoryId: 'category-tire',
	},
	//шины авто
	{
		servicesId: 'product-1',
		categoryId: 'category-automotive',
	},
	{
		servicesId: 'product-2',
		categoryId: 'category-automotive',
	},
	{
		servicesId: 'product-3',
		categoryId: 'category-automotive',
	},
	{
		servicesId: 'product-4',
		categoryId: 'category-automotive',
	},
	{
		servicesId: 'product-7',
		categoryId: 'category-automotive',
	},
	{
		servicesId: 'product-10',
		categoryId: 'category-automotive',
	},
	{
		servicesId: 'product-9',
		categoryId: 'category-automotive',
	},
	{
		servicesId: 'product-8',
		categoryId: 'category-automotive',
	},
	//груз
	{
		servicesId: 'product-5',
		categoryId: 'category-cargo',
	},
	{
		servicesId: 'product-11',
		categoryId: 'category-cargo',
	},
	{
		servicesId: 'product-13',
		categoryId: 'category-cargo',
	},
	//мото
	{
		servicesId: 'product-6',
		categoryId: 'category-motorcycle',
	},
	{
		servicesId: 'product-12',
		categoryId: 'category-motorcycle',
	},
	{
		servicesId: 'product-14',
		categoryId: 'category-motorcycle',
	},
];

const modelCarRef = [
	{
		id: 'product-13',
		setId: 3,
	},
	{
		id: 'product-12',
		setId: 3,
	},
	{
		id: 'product-7',
		setId: 3,
	},
	{
		id: 'product-6',
		setId: 3,
	},
	{
		id: 'product-5',
		setId: 2,
	},
	{
		id: 'product-3',
		setId: 2,
	},
	{
		id: 'product-2',
		setId: 3,
	},
];
const seasonsRef = [
	// default 1
	{
		id: 'product-12',
		setId: 2,
	},
	{
		id: 'product-13',
		setId: 3,
	},
	{
		id: 'product-8',
		setId: 3,
	},
	{
		id: 'product-6',
		setId: 2,
	},
	{
		id: 'product-4',
		setId: 2,
	},
	{
		id: 'product-2',
		setId: 3,
	},
];
const speedIndexRef = [
	{
		id: 'product-12',
		setId: 3,
	},
	{
		id: 'product-13',
		setId: 3,
	},
	{
		id: 'product-6',
		setId: 3,
	},
	{
		id: 'product-5',
		setId: 2,
	},
];
const fuelEfficiencyRef = [
	{
		id: 'product-13',
		setId: 7,
	},
	{
		id: 'product-12',
		setId: 7,
	},
	{
		id: 'product-4',
		setId: 4,
	},
	{
		id: 'product-2',
		setId: 3,
	},
	{
		id: 'product-5',
		setId: 6,
	},
	//
	{
		id: 'product-6',
		setId: 7,
	},
	{
		id: 'product-10',
		setId: 4,
	},
	{
		id: 'product-8',
		setId: 3,
	},
	{
		id: 'product-11',
		setId: 6,
	},
];
const gripSurfacesRef = [
	{
		id: 'product-6',
		setId: 7,
	},
	{
		id: 'product-4',
		setId: 4,
	},
	{
		id: 'product-2',
		setId: 3,
	},
	{
		id: 'product-5',
		setId: 6,
	},
	////
	{
		id: 'product-13',
		setId: 7,
	},
	{
		id: 'product-12',
		setId: 7,
	},
	{
		id: 'product-8',
		setId: 4,
	},
	{
		id: 'product-7',
		setId: 3,
	},
	{
		id: 'product-10',
		setId: 6,
	},
];
const manufacturersRef = [
	{
		id: 'product-6',
		setId: 2,
	},
	{
		id: 'product-4',
		setId: 4,
	},
	{
		id: 'product-2',
		setId: 3,
	},
	{
		id: 'product-5',
		setId: 6,
	},
	///////
	{
		id: 'product-13',
		setId: 2,
	},
	{
		id: 'product-12',
		setId: 2,
	},
	{
		id: 'product-8',
		setId: 4,
	},
	{
		id: 'product-9',
		setId: 3,
	},
	{
		id: 'product-7',
		setId: 6,
	},
];
export interface IChangesData {
	[key: string]: { id: string; setId: number }[];
}

export const communications = {
	catRefServices,
	catRefProducts,
	catRefNews,
	changes: {
		modeCarlId: modelCarRef,
		seasonId: seasonsRef,
		manufacturersId: manufacturersRef,
		speedIndexId: speedIndexRef,
		fuelEfficiencyId: fuelEfficiencyRef,
		gripSurfacesId: gripSurfacesRef,
	},
};
