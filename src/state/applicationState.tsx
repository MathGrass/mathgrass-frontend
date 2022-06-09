import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as joint from 'jointjs';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import {getDemoAssessmentSchema} from './initialResources/demoQuestionSchema';
import {generateDemoGraph} from './initialResources/demoGraph';
import {getDemoTaskTypes} from './initialResources/demoTaskTypes';

interface ApplicationState {
    taskType: string;
    taskId: string;
    graphUneditedOriginal: any;
    graphInEditor: any;
    jsonFormDescription: JsonFormTuple;
    hintLevel: number;
    availableTasks: TaskTuple[];
}

export interface TaskTuple {
    identifier: string; displayName: string;
}

export interface JsonFormTuple {
    schema: JSONSchema7;
    uiSchema: UiSchema;
}

function getInitialApplicationState(): ApplicationState {
    return {
        taskType: 'randomTaskType',
        taskId: 'randomId',
        graphUneditedOriginal: undefined,
        graphInEditor: undefined,
        jsonFormDescription: getDemoAssessmentSchema(),
        hintLevel: 0,
        availableTasks: getDemoTaskTypes()
    };
}

const initialTaskState: ApplicationState = getInitialApplicationState();
export const applicationState = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        requestNewGraph: (state, action: PayloadAction<{ asd: string }>) => {
            state.taskId = String(Math.floor(Math.random() * 123));
            state.graphUneditedOriginal = generateDemoGraph().toJSON();
            state.graphInEditor = action.payload;
        },
        propagateGraphState: (state, action: PayloadAction<any>) => {
            state.graphInEditor = action.payload;
        }
    }
});

export const { requestNewGraph, propagateGraphState } = applicationState.actions;
export default applicationState.reducer;
