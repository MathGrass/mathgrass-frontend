import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as joint from 'jointjs';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import {getDemoAssessmentSchema} from './initialResources/demoQuestionSchema';
import {generateDemoGraph} from './initialResources/demoGraph';

interface TaskState {
    taskType: string;
    taskId: string;
    graphUneditedOriginal: any;
    graphInEditor: any;
    questionSchema: AssessmentSchema;
    hintLevel: number;
    availableTasks: { identifier: string; displayName: string; } [];
}


export interface AssessmentSchema {
    assessmentSchema: JSONSchema7;
    assessmentUiSchema: UiSchema;
}

function getInitialTaskState(): TaskState {
    return {
        taskType: 'randomTaskType',
        taskId: 'randomId',
        graphUneditedOriginal: undefined,
        graphInEditor: undefined,
        questionSchema: getDemoAssessmentSchema(),
        hintLevel: 0,
        availableTasks: getDemoTaskTypes()
    };
}

export interface JSONSchemaEnumType {
    'enum': string;
    'title': string;
}


const initialTaskState: TaskState = getInitialTaskState();
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

function getDemoTaskTypes() {
    return [{
        identifier: 'planarity',
        displayName: 'Planarity'
    }, {
        identifier: 'bipartite',
        displayName: 'Bipartite Graphs'
    }];
}


export const { requestNewGraph, propagateGraphState } = applicationState.actions;
export default applicationState.reducer;
