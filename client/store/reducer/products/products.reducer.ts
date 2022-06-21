import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { FiltersProductKey, IProductData, IProductFilter, IProductReqData, ReqOptions } from '../../../../@types';
import { apiService } from '../../../../services/api';
import { filterUpdate } from '../../../utils/filter.utils';
import { PRODUCTS_KEY } from './products.const';
import { IProductsState } from './products.model';

const setProducts = (
	state: IProductsState,
	{ payload }: { payload: IProductReqData }
) => {
	state.products = Array.isArray(payload.products) ? payload.products : state.products;
	state.options = payload.options || state.options;
	state.total = payload.total || state.total;
};

const changeProductsOptions = (
	state: IProductsState,
	{ payload }: { payload: ReqOptions}
) => {
	state.options = payload;
};

const productsRequest = (state: IProductsState) => {
	state.isLoading = true;
	state.error = '';
};

const productsRequestSuccess = (
	state: IProductsState,
	{ payload }: { payload: IProductData[] }
) => {
	state.products = payload;
	state.isLoading = false;
	state.error = '';
};

const productsRequestFailed = (
	state: IProductsState,
	{ payload }: { payload: string }
) => {
	state.isLoading = false;
	state.error = payload;
};

const productsFilter = (
	state: IProductsState,
	{ payload }: { payload: IProductFilter }
) => {
	state.filter = { ...filterUpdate<IProductFilter>(payload) };
};

export const  fetchProductsList = createAsyncThunk(
	'products/fetchProductsList',
	async ({
		options,
		body = {},
	}: {options: ReqOptions, body?: { [key: string]: string | number | object }}, thunkAPI) => {
		const response = await apiService.get<IProductReqData>(`products`,{...body, ...options});
		return response.data as IProductReqData;
	}
  ) 

export const productsSlice = createSlice({
	name: PRODUCTS_KEY,
	initialState: {
        isLoading: false,
        error: '',
        products: [],
        filter: {},
		options: {
			limit: 9,
			offset: 0,
		},
		total: 0,
		isHydrate: false,
    },
	reducers: {
		productsRequestFailed,
		setProducts,
		productsRequest,
		productsRequestSuccess,
		productsFilter,
		changeProductsOptions,
	},
	extraReducers: {
        [HYDRATE]: (state, action) => {
			
			if(!state.isHydrate){
				return {
					...state,
					...action.payload.products,
					isHydrate: true,
				};
			}
        },
		[fetchProductsList.fulfilled.type]: (state: IProductsState, {payload}:{payload: IProductReqData}) => {
			state.products = Array.isArray(payload.products) ? payload.products : state.products;
			state.options = payload.options || state.options;
			state.total = payload.total || state.total;
			state.isLoading = false;
		},
		[fetchProductsList.pending.type]: (state: IProductsState) => {
			state.isLoading = true;
			state.error = ""
		},
		[fetchProductsList.rejected.type]: (state: IProductsState, {payload}) => {
			state.error = payload;
			state.isLoading = false;
		}

    }
})

export const toProductsAction = productsSlice.actions;