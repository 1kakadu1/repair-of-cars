import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {  IProductData, IProductReqData, IProductSimilarReqBody, IProductSimilarReqData, ReqOptions } from '../../../../@types';
import { apiService } from '../../../../services/api';
import { PRODUCT_KEY } from './product.const';
import { IProductState } from './product.model';

const setProduct = (
	state: IProductState,
	{ payload }: { payload: IProductReqData }
) => {
	state.product = !Array.isArray(payload.products) ? payload.products : state.product;
};

const productsRequest = (state: IProductState) => {
	state.isLoading = true;
	state.error = '';
};

const productsRequestSuccess = (
	state: IProductState,
	{ payload }: { payload: IProductData }
) => {
	state.product = payload;
	state.isLoading = false;
	state.error = '';
};

const productsRequestFailed = (
	state: IProductState,
	{ payload }: { payload: string }
) => {
	state.isLoading = false;
	state.error = payload;
};



export const  fetchProductBySlug = createAsyncThunk(
	'product/fetchProductBySlug',
	async ({
		slug,
		options,
		body = {},
	}: {slug: string ; options?: ReqOptions, body?: { [key: string]: string | number | object }}
	, thunkAPI) => {
		const response = await apiService.get<IProductReqData>(`products/`+slug,{...body, ...options});
		return response.data as IProductReqData;
	}
  )
  
  export const  fetchProductSimilarList = createAsyncThunk(
	'product/fetchProductSimilarList',
	async ({
		options,
		body,
	}: {options?: ReqOptions, body: {slug: string, id?: string}}
	, thunkAPI) => {
		const response = await apiService.post<{slug: string, id?: string},IProductSimilarReqData>(`products/similar`,{...body, ...options});
		return response.data;
	}
  ) 

export const productSlice = createSlice({
	name: PRODUCT_KEY,
	initialState: {
        isLoading: false,
        error: '',
        product: undefined,
		isHydrate: false,
		similar: {
			products: [],
			isLoading: true,
			error: ''
		},
    },
	reducers: {
		productsRequestFailed,
		setProduct,
		productsRequest,
		productsRequestSuccess,
		clearProduct:(state: IProductState)=>{
			state.product = undefined;
			state.error = "";
			state.similar = {
				isLoading: false,
				products: [],
				error: ""
			}
		}
	},
	extraReducers: {
        [HYDRATE]: (state, action) => {
			
			if(!state.isHydrate){
				return {
					...state,
					...action.payload.product,
					isHydrate: true,
				};
			}
        },
		
		[fetchProductBySlug.fulfilled.type]: (state: IProductState, {payload}:{payload: IProductReqData}) => {
			state.product = !Array.isArray(payload.products) ? payload.products : state.product;
			state.isLoading = false;
		},
		[fetchProductBySlug.pending.type]: (state: IProductState) => {
			state.isLoading = true;
			state.error = ""
		},
		[fetchProductBySlug.rejected.type]: (state: IProductState, {payload}) => {
			state.error = payload;
			state.isLoading = false;
		},

		[fetchProductSimilarList.fulfilled.type]: (state: IProductState, {payload}:{payload: IProductReqData}) => {
			state.similar.products = Array.isArray(payload.products) ? payload.products : state.similar.products;
			state.similar.isLoading = false;
		},
		[fetchProductSimilarList.pending.type]: (state: IProductState) => {
			state.similar.isLoading = true;
			state.similar.error = ""
		},
		[fetchProductSimilarList.rejected.type]: (state: IProductState, {payload}) => {
			state.similar.error = payload;
			state.similar.isLoading = false;
		},
    }
})

export const toProductAction = productSlice.actions;