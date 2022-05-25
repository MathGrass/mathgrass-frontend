import { configureStore } from '@reduxjs/toolkit';
import {graphSlice} from '../graphSlice';
import {taskSlice} from '../taskSlice';

export const store = configureStore({
    reducer: {
        taskManagement: taskSlice.reducer,
        graphManagement: graphSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;