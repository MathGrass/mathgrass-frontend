import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './common/store';
import * as joint from "jointjs";
import {JSONSchema7} from "json-schema";
import {generateDemoGraph} from "./initialResources/demoGraph";

interface TaskState {
    taskType: string;
    taskId: string;
    graphPayload: any;
}

function getInitialTaskState(): TaskState {
    return {
        taskType: 'randomTaskType',
        taskId: 'randomId',
        graphPayload: undefined
    };
}

const initialState: TaskState = getInitialTaskState();

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        requestNewGraph: (state, action: PayloadAction<string>) => {
            state.taskId = String(Math.floor(Math.random() * 123));
            state.graphPayload = new joint.dia.Graph({}, {cellNamespace: joint.shapes}).toJSON();
        }
    }
});

export const { requestNewGraph } = taskSlice.actions;
export default taskSlice.reducer;