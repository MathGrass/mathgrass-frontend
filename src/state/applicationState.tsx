import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import {getDemoAssessmentSchema} from './demoResources/demoQuestionSchema';
import {generateDemoGraph} from './demoResources/demoGraph';
import {getDemoTaskTypes} from './demoResources/demoTaskTypes';

interface ApplicationState {
    taskType: string | undefined;
    taskId: string | undefined;
    graphUneditedOriginal: any;
    graphInEditor: any;
    jsonFormDescription: JsonFormTuple | undefined;
    hintLevel: number;
    availableTasks: TaskTuple[];
    showFeedbackSection: boolean;
    assessmentFeedback: string | undefined;
    currentHintFeedback: string | undefined;
    feedbackHistory: string [];
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
        taskType: undefined,
        taskId: undefined,
        graphUneditedOriginal: undefined,
        graphInEditor: undefined,
        jsonFormDescription: undefined,
        hintLevel: 0,
        availableTasks: [],
        showFeedbackSection: false,
        assessmentFeedback: undefined,
        currentHintFeedback: undefined,
        feedbackHistory: [] as string[]
    };
}

const initialTaskState: ApplicationState = getInitialApplicationState();
export const applicationState = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        requestNewGraph: (state, action: PayloadAction<string>) => {
            state.taskType = action.payload;
            // fetch new graph for the given task state
            state.taskId = String(Math.floor(Math.random() * 123));
            state.graphUneditedOriginal = generateDemoGraph().toJSON();
            // and set graphInEditor state accordingly
            state.graphInEditor = action.payload;
            state.jsonFormDescription = getDemoAssessmentSchema();
            // reset UI
            state.showFeedbackSection = false;
            // reset hints
            state.hintLevel = 0;
            state.currentHintFeedback = undefined;
            state.feedbackHistory = [] as string [];
        },
        propagateGraphState: (state, action: PayloadAction<any>) => {
            state.graphInEditor = action.payload;
        },
        requestAssessment: (state) => {
            state.showFeedbackSection = true;
            state.assessmentFeedback = 'This is the assessment of the given task.';
        },
        requestHint: (state) => {
            // Push old current hint to hint history
            if(state.currentHintFeedback !== undefined){
                state.feedbackHistory.push(state.currentHintFeedback);
            }
            // request new hint and set it accordingly
            state.currentHintFeedback = 'This is a hint.';
        },
        setupApplication: (state) => {
            state.availableTasks = getDemoTaskTypes();
        }
    }
});

export const {requestNewGraph, propagateGraphState, requestAssessment, requestHint, setupApplication } = applicationState.actions;
// export default applicationState.reducer;
