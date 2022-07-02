import React, { useEffect, useState } from 'react';
import { IProductData, IProductSimilarReqData, ReqOptions } from '../../@types';
import { apiService } from '../../services/api';
export interface ISimilarProducts {
	products: IProductData[];
	isLoading: boolean;
	error: string;
}
export interface ISimilarProductsOptionsProps extends ReqOptions {
	slug: string;
	id?: string;
}
export const useSimilarProducts = (options: ISimilarProductsOptionsProps) => {
	const [similar, setSimilar] = useState<ISimilarProducts>({
		products: [],
		isLoading: false,
		error: '',
	});

	useEffect(() => {
		if (!similar.isLoading) {
			setSimilar((prev) => ({ ...prev, isLoading: true }));
			apiService
				.post<
					{ slug: string; id?: string; limit: number; offset: number },
					IProductSimilarReqData
				>(`products/similar`, { ...options })
				.then((res) => {
					if (res.data !== undefined && res?.data?.products) {
						const products = res.data.products;
						setSimilar((prev) => ({ ...prev, products, isLoading: false }));
					}

					if (res.error) {
						const error = res.error;
						setSimilar((prev) => ({ ...prev, error, isLoading: false }));
					}
				})
				.catch((error) => {
					setSimilar((prev) => ({
						...prev,
						error: error.message.toString(),
						isLoading: false,
					}));
				});
		}
	}, [options.slug]);

	return {
		...similar,
		changeSimilar: (values: ISimilarProducts) => setSimilar({ ...values }),
	};
};
