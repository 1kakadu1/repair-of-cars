import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IServicesReqData, ReqOptions } from '../../../../@types';
import { apiService } from '../../../../services/api';
import { SERVICES_KEY } from './services.const';
import { IServicesState } from './services.model';

const setServices = (
	state: IServicesState,
	{ payload }: { payload: IServicesReqData }
) => {
	state.services = payload.services;
	state.total = payload.total;
	state.options = payload.options;
};

const servicesRequest = (state: IServicesState) => {
	state.isLoading = true;
	state.error = '';
};

const servicesRequestSuccess = (
	state: IServicesState,
	{ payload }: { payload: IServicesReqData }
) => {
	state.services = payload.services;
	state.options = payload.options;
	state.total = payload.total;
	state.isLoading = false;
	state.error = '';
};

const servicesRequestFailed = (
	state: IServicesState,
	{ payload }: { payload: string }
) => {
	state.isLoading = false;
	state.error = payload;
};
export const fetchServicesList = createAsyncThunk(
	'news/fetchNewsList',
	async ({
		options,
		body = {},
	}: {
		options: ReqOptions;
		body?: { [key: string]: string | number | object };
	}) => {
		const response = await apiService.get<IServicesReqData>(`services`, {
			...body,
			...options,
		});
		return response.data as IServicesReqData;
	}
);
export const servicesSlice = createSlice({
	name: SERVICES_KEY,
	initialState: {
		isLoading: false,
		error: '',
		services: [],
		total: 0,
		options: {
			limit: 0,
			offset: 0,
		},
		isHydrate: false,
	},
	reducers: {
		setServices,
		servicesRequest,
		servicesRequestSuccess,
		servicesRequestFailed,
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			if (!state.isHydrate) {
				return {
					...state,
					...action.payload.services,
					isHydrate:
						action.payload.services.services !== undefined &&
						action.payload.services.services.length > 0
							? true
							: false,
				};
			}
		},
		[fetchServicesList.fulfilled.type]: (
			state: IServicesState,
			{ payload }: { payload: IServicesReqData }
		) => {
			state.services = payload.services;
			state.options = payload.options || state.options;
			state.total = payload.total || state.total;
			state.isLoading = false;
		},
		[fetchServicesList.pending.type]: (state: IServicesState) => {
			state.isLoading = true;
			state.error = '';
		},
		[fetchServicesList.rejected.type]: (state: IServicesState, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		},
	},
});

export const toServicesAction = servicesSlice.actions;
