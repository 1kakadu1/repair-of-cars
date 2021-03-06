import {
	Action,
	combineReducers,
	configureStore,
	getDefaultMiddleware,
	ThunkAction,
} from '@reduxjs/toolkit';
import { slices } from './slices';
import logger from 'redux-logger';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';

const middlewareArr: any = [];

if (process.env.NODE_ENV === `development`) {
	middlewareArr.push(logger);
}

const makeStore = () =>
	configureStore({
		reducer: {
			...slices,
		},
		devTools: true,
		//middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
		//middleware: [...middlewareArr, ...getDefaultMiddleware()]
	});
export const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const wrapper = createWrapper<AppStore>(makeStore);
