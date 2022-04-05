import { configureStore } from '@reduxjs/toolkit';
import {taskSlice} from '../components/taskManagement/taskManagementSlice';

export const store = configureStore({
    reducer: {
        taskManagement: taskSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;