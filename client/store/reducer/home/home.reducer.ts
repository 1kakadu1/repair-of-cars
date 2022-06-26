import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IHomeReqData, ReqOptions } from '../../../../@types';
import { apiService } from '../../../../services/api';
import { HOME_KEY } from './home.const';
import { IHomeState } from './home.model';

const setHome = (state: IHomeState, { payload }: { payload: IHomeReqData }) => {
	state.products = payload.products;
	state.services = payload.services;
	state.news = payload.news;
};

export const fetchHome = createAsyncThunk(
	'home/fetchHome',
	async (
		{
			options,
			body = {},
		}: {
			options?: ReqOptions;
			body?: { [key: string]: string | number | object };
		},
		thunkAPI
	) => {
		const response = await apiService.get<IHomeReqData>(`home`, {
			...body,
			...options,
		});
		return response.data as IHomeReqData;
	}
);
export const homeSlice = createSlice({
	name: HOME_KEY,
	initialState: {
		isLoading: false,
		error: '',
		products: {
			all: [],
			popular: [],
		},
		services: [],
		news: [],
		isHydrate: false,
	},
	reducers: {
		setHome,
		homeRequestFailed: (
			state: IHomeState,
			{ payload }: { payload: string }
		) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			if (!state.isHydrate) {
				return {
					...state,
					...action.payload.home,
					isHydrate:
						action.payload.home.products.all.length === 0 ? false : true,
				};
			}
		},
		[fetchHome.fulfilled.type]: (state, { payload }) => {
			state.products = payload.products;
			(state.services = payload.services),
				(state.news = payload.news),
				(state.isLoading = false);
		},
		[fetchHome.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},
		[fetchHome.rejected.type]: (state, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		},
	},
});

export const toHomeAction = homeSlice.actions;
