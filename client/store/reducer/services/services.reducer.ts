import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IServicesData, IServicesReqData } from '../../../../@types';
import { SERVICES_KEY } from './services.const';
import { IServicesState } from './services.model';

const setServices = (
	state: IServicesState,
	{ payload }: { payload: IServicesReqData }
) => {
	state.services = payload.data;
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
	state.services = payload.data;
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


export const servicesSlice = createSlice({
	name: SERVICES_KEY,
	initialState: {
        isLoading: false,
        error: '',
        services: [],
        filter: {},
		total: 0,
		options: {
			limit: 0,
			offset: 0,
		}
		
    },
	reducers: {
		setServices,
		servicesRequest,
		servicesRequestSuccess,
		servicesRequestFailed,
	},
	extraReducers: {
        [HYDRATE]: (state, action) => {
			//console.log("action.payload=====", action.payload);
            return {
                ...state,
				...action.payload.services
            };
        },
    }
});

export const toServicesAction = servicesSlice.actions;