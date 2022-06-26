import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFilterProductData } from '../../../../@types';
import { apiService } from '../../../../services/api';
import { FILTERS_KEY } from './filters.const';
import { IFiltersState } from './filters.model';

export const filtersSlice = createSlice({
	name: FILTERS_KEY,
	initialState: {
		isLoading: false,
		error: '',
		filters: undefined,
	},
	reducers: {
		setFilters: (
			state: IFiltersState,
			{ payload }: { payload: IFilterProductData }
		) => {
			state.filters = payload;
		},

		request: (state: IFiltersState) => {
			state.isLoading = true;
			state.error = '';
		},
		requestSuccess: (
			state: IFiltersState,
			{ payload }: { payload: IFilterProductData }
		) => {
			state.filters = payload;
			state.isLoading = false;
			state.error = '';
		},
		requestFailed: (state: IFiltersState, { payload }: { payload: string }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
	extraReducers: {},
});

export const toFiltersAction = filtersSlice.actions;
