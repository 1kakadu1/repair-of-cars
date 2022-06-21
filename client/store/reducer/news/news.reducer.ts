import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { INewsData, INewsReqData } from '../../../../@types';
import { NEWS_KEY } from './news.const';
import { INewsState } from './news.model';

const setNews = (
	state: INewsState,
	{ payload }: { payload: INewsReqData }
) => {
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


export const newsSlice = createSlice({
	name: NEWS_KEY,
	initialState: {
        isLoading: false,
        error: '',
        news: [],
        filter: {},
		total: 0,
		options: {
			limit: 0,
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
			if(!state.isHydrate){
				return {
					...state,
					...action.payload.news,
					isHydrate: true
				};
			}

        },
    }
});

export const toNewsAction = newsSlice.actions;