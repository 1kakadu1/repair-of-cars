import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IHomeReqData } from '../../../../@types';
import { HOME_KEY } from './home.const';
import { IHomeState  } from './home.model';

const setHome = (
	state: IHomeState ,
	{ payload }: { payload: IHomeReqData }
) => {
	state.products = payload.products;
	state.services = payload.services;
	state.news = payload.news;
};

export const homeSlice = createSlice({
	name: HOME_KEY,
	initialState: {
        isLoading: false,
        error: '',
        products: {
			all: [],
			popular:[],
		},
		services: [],
		news: [],
		isHydrate: false
    },
	reducers: {
		setHome,
		homeRequestFailed:(
			state: IHomeState,
			{ payload }: { payload: string }
		) => {
			state.isLoading = false;
			state.error = payload;
		}
	},
	extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
				...action.payload.home,
				isHydrate: true

            };
        },
    }
});

export const toHomeAction = homeSlice.actions;