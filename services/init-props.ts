import {
	ICategoryReqData,
	IHomeReqData,
	INewsReqData,
	IProductReqData,
} from '../@types';
import { toCategoryAction } from '../client/store/reducer/category/category.reducer';
import { toHomeAction } from '../client/store/reducer/home/home.reducer';
import { toNewsAction } from '../client/store/reducer/news/news.reducer';
import { toProductsAction } from '../client/store/reducer/products/products.reducer';
import { AppStore } from '../client/store/state';
import { apiService } from './api';

class InitialPropsServices {
	async getCategory(store: AppStore) {
		try {
			const state = store.getState().category;

			if (!state.isHydrate) {
				const { data: dataCat, error: errorCat } =
					await apiService.get<ICategoryReqData>('category');
				if (dataCat) {
					store.dispatch(toCategoryAction.setCategoryList(dataCat));
				} else if (errorCat) {
					store.dispatch(toCategoryAction.categoryRequestFailed(errorCat));
				}
			}
		} catch (error: any) {
			console.error('Req error ' + error.message.toString());
		}
	}

	async getProducts(
		store: AppStore,
		query: { [key: string]: any },
		page: number
	) {
		const state = store.getState().products;
		try {
			const { data, error } = await apiService.get<IProductReqData>(
				`products`,
				JSON.parse(
					JSON.stringify({
						...query,
						limit: state.options.limit,
						offset: page === 1 ? 0 : state.options.limit * (page - 1),
					})
				)
			);
			if (!state.isHydrate) {
				if (data) {
					store.dispatch(toProductsAction.setProducts(data));
				} else if (error) {
					store.dispatch(toProductsAction.productsRequestFailed(error));
				}
			}
		} catch (error: any) {
			console.error('Req error ' + error.message.toString());
		}
	}

	async getHome(store: AppStore) {
		const state = store.getState().home;
		if (!state.isHydrate) {
			try {
				const { data, error } = await apiService.get<IHomeReqData>(`home`);
				if (data) {
					store.dispatch(toHomeAction.setHome(data));
				} else if (error) {
					store.dispatch(toHomeAction.homeRequestFailed(error));
				}
			} catch (error: any) {
				console.error('Req error ' + error.message.toString());
			}
		}
	}

	async getNews(store: AppStore, page: number, query: { [key: string]: any }) {
		const state = store.getState().news;
		try {
			if (
				query['params'] === undefined ||
				query['params'] === null ||
				(!Array.isArray(query['params']) &&
					query['params'].length === 1 &&
					isNaN(page))
			) {
				throw Error('404. Not found news');
			}

			const { data, error } = await apiService.get<INewsReqData>(
				`news`,
				JSON.parse(
					JSON.stringify({
						...query,
						limit: state.options.limit,
						offset: page === 1 ? 0 : state.options.limit * (page - 1),
					})
				)
			);
			if (!state.isHydrate) {
				if (data) {
					store.dispatch(toNewsAction.setNews(data));
				} else if (error) {
					store.dispatch(toNewsAction.newsRequestFailed(error));
				}
			}
		} catch (error: any) {
			store.dispatch(toNewsAction.newsRequestFailed(error.message.toString()));
		}
	}
}

export const intPropsServices = new InitialPropsServices();
