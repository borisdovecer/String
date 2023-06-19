import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducers from './store';

export const store = configureStore({
    reducer: rootReducers, // Set the root reducers object as the main reducer for the store
    devTools: true, // Enable Redux DevTools for easier state debugging and monitoring
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
