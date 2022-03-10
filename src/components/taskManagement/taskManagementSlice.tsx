import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../state/store';

interface TaskState {
    taskType: string;
    taskId: string;
}

function getInitialTaskState(): TaskState {
    return {
        taskType: 'randomTaskType',
        taskId: 'randomId'
    };
}

const initialState: TaskState = getInitialTaskState();

export const taskSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            alert('Action!');
        }
    }
});

export const { increment } = taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type
/*
export const selectCount = (state: RootState) => state.counter/
*/

export default taskSlice.reducer;