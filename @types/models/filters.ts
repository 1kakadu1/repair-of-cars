import {
	CarModel,
	Category,
	FuelEfficiency,
	GripSurfaces,
	Manufacturers,
	Seasons,
	SpeedIndex,
} from '@prisma/client';

export interface IFilterProductData {
	category?: Category[];
	modelCar?: CarModel[];
	season?: Seasons[];
	manufacturers?: Manufacturers[];
	speedIndex?: SpeedIndex[];
	fuelEfficiency?: FuelEfficiency[];
	gripSurfaces?: GripSurfaces[];
	price: {
		min: number;
		max: number;
	};
	rating: {
		checked: boolean;
		rating: number;
		id: string;
	}[];
}
