import { configureStore } from '@reduxjs/toolkit';
import {applicationState} from '../applicationState';

export const store = configureStore({
    reducer: {
        applicationStateManagement: applicationState.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;