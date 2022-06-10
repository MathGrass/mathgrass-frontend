import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as joint from 'jointjs';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import {getDemoAssessmentSchema} from './demoResources/demoQuestionSchema';
import {generateDemoGraph} from './demoResources/demoGraph';
import {getDemoTaskTypes} from './demoResources/demoTaskTypes';

interface ApplicationState {
    taskType: string;
    taskId: string;
    graphUneditedOriginal: any;
    graphInEditor: any;
    jsonFormDescription: JsonFormTuple | undefined;
    hintLevel: number;
    availableTasks: TaskTuple[];
    showFeedbackSection: boolean;
    assessmentFeedback: string | undefined;
    currentHintFeedback: string | undefined;
    feedbackHistory: string [] | undefined;
}

export interface TaskTuple {
    identifier: string;
    displayName: string;
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
        jsonFormDescription: undefined,
        hintLevel: 0,
        availableTasks: getDemoTaskTypes(),
        showFeedbackSection: false,
        assessmentFeedback: undefined,
        currentHintFeedback: undefined,
        feedbackHistory: undefined
    };
}

const initialTaskState: ApplicationState = getInitialApplicationState();
export const applicationState = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        requestNewGraph: (state, action: PayloadAction<string>) => {
            // fetch new graph for the given task state
            state.taskId = String(Math.floor(Math.random() * 123));
            state.graphUneditedOriginal = generateDemoGraph().toJSON();
            // and set graphInEditor state accordingly
            state.graphInEditor = action.payload;
            state.jsonFormDescription = getDemoAssessmentSchema();
        },
        propagateGraphState: (state, action: PayloadAction<any>) => {
            state.graphInEditor = action.payload;
        },
        requestAssessment: (state, action: PayloadAction<any>) => {
            state.showFeedbackSection = true;
            state.assessmentFeedback = 'This is the assessment of the given task.';
        },
        requestHint: (state, action: PayloadAction<any>) => {
            state.currentHintFeedback = 'This is a hint.';
        },
        resetApplication: (state, action: PayloadAction<any>) => {
            state = getInitialApplicationState();
        },
    }
});

export const {requestNewGraph, propagateGraphState, requestAssessment, requestHint} = applicationState.actions;
export default applicationState.reducer;
