import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { INewsReqData, ReqOptions } from '../../../../@types';
import { NEWS_KEY } from './news.const';
import { INewsState } from './news.model';
import { apiService } from '../../../../services/api';

const setNews = (state: INewsState, { payload }: { payload: INewsReqData }) => {
	state.news = payload.news;
	state.total = payload.total;
	state.options = payload.options;
};

const newsRequest = (state: INewsState) => {
	state.isLoading = true;
	state.error = '';
};

const newsRequestSuccess = (
	state: INewsState,
	{ payload }: { payload: INewsReqData }
) => {
	state.news = payload.news;
	state.options = payload.options;
	state.total = payload.total;
	state.isLoading = false;
	state.error = '';
};

const newsRequestFailed = (
	state: INewsState,
	{ payload }: { payload: string }
) => {
	state.isLoading = false;
	state.error = payload;
};

export const fetchNewsList = createAsyncThunk(
	'news/fetchNewsList',
	async ({
		options,
		body = {},
	}: {
		options: ReqOptions;
		body?: { [key: string]: string | number | object };
	}) => {
		const response = await apiService.get<INewsReqData>(`news`, {
			...body,
			...options,
		});
		return response.data as INewsReqData;
	}
);

export const newsSlice = createSlice({
	name: NEWS_KEY,
	initialState: {
		isLoading: false,
		error: '',
		news: [],
		total: 0,
		options: {
			limit: 10,
			offset: 0,
		},
		isHydrate: false,
	},
	reducers: {
		setNews,
		newsRequest,
		newsRequestSuccess,
		newsRequestFailed,
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			if (!state.isHydrate) {
				return {
					...state,
					...action.payload.news,
					isHydrate:
						action.payload.news.news !== undefined &&
						action.payload.news.news.length > 0
							? true
							: false,
				};
			}
		},
		[fetchNewsList.fulfilled.type]: (
			state: INewsState,
			{ payload }: { payload: INewsReqData }
		) => {
			state.news = Array.isArray(payload.news) ? payload.news : state.news;
			state.options = payload.options || state.options;
			state.total = payload.total || state.total;
			state.isLoading = false;
		},
		[fetchNewsList.pending.type]: (state: INewsState) => {
			state.isLoading = true;
			state.error = '';
		},
		[fetchNewsList.rejected.type]: (state: INewsState, { payload }) => {
			state.error = payload;
			state.isLoading = false;
		},
	},
});

export const toNewsAction = newsSlice.actions;
