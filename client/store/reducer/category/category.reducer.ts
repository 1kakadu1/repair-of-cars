import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ICategoryReqData } from '../../../../@types';
import { CATEGORY_KEY } from './category.const';
import { ICategoryState } from './category.model';


export const categorySlice = createSlice({
	name: CATEGORY_KEY,
	initialState: {
        isLoading: false,
        error: '',
        category: [],
        filter: {},
		total: 0,
		isHydrate: false,
		options: {
			limit: 0,
			offset: 0,
		}
		
    },
	reducers: {
		setCategoryList :(
			state: ICategoryState,
			{ payload }: { payload: ICategoryReqData }
		) => {
			state.category = payload.category;
			state.total = payload.total;
			state.options = payload.options;
		},
		categoryRequest: (state: ICategoryState) => {
			state.isLoading = true;
			state.error = '';
		},
		categoryRequestSuccess: (
			state: ICategoryState,
			{ payload }: { payload: ICategoryReqData }
		) => {
			state.category = payload.category;
			state.options = payload.options;
			state.total = payload.total;
			state.isLoading = false;
			state.error = '';
		},
		categoryRequestFailed :(
			state: ICategoryState,
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
				...action.payload.category,
				isHydrate: true
            };
        },
    }
});

export const toCategoryAction = categorySlice.actions;