import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import {FetchError, TaskDTO, TaskIdLabelTupleDTO} from '../src-gen/mathgrass-api';
import {fetchAssessment, fetchAvailableTasks, fetchHint, fetchTaskById} from './asyncThunks';


interface ApplicationState {
    graphInEditor: any;
    hintLevel: number;
    currentTask: TaskDTO | null;
    currentAssessmentResponse: boolean | null;
    availableTasks: TaskIdLabelTupleDTO[];
    showFeedbackSection: boolean;
    showWaitingForEvaluation: boolean;
    assessmentFeedback: string | undefined;
    currentAnswer: string | undefined;
    feedbackHistory: string [];
}

export interface JsonFormTuple {
    schema: JSONSchema7;
    uiSchema: UiSchema;
}

function getInitialApplicationState(): ApplicationState {
    return {
        graphInEditor: undefined,
        hintLevel: 0,
        currentTask: null,
        currentAssessmentResponse: null,
        showFeedbackSection: false,
        showWaitingForEvaluation: false,
        assessmentFeedback: undefined,
        feedbackHistory: [] as string[],
        availableTasks: [] as TaskIdLabelTupleDTO[],
        currentAnswer: undefined
    };
}

const initialTaskState: ApplicationState = getInitialApplicationState();
export const applicationState = createSlice({
    name: 'tasks', initialState: initialTaskState, reducers: {
        propagateGraphState: (state, action: PayloadAction<any>) => {
            state.graphInEditor = action.payload;
        },
        propagateCurrentAnswer: (state, action: PayloadAction<string>) => {
            state.currentAnswer = action.payload;
            state.showWaitingForEvaluation = true;
        },
    }, extraReducers: (builder) => {
        builder.addCase(fetchTaskById.fulfilled, (state, action) => {
            // check whether action is void or not
            if (!isFetchErrorOrUndefined(action)) {
                state.currentTask = action.payload as TaskDTO;
                state.currentAssessmentResponse = null;
                // Handle fetch by id logic
                // state.availableTasks = action.payload as number[];
            }
        });
        builder.addCase(fetchHint.fulfilled, (state, action) => {
            // check whether action is void or not
            if (!isFetchErrorOrUndefined(action)) {
                state.feedbackHistory.push(action.payload.content);
                state.hintLevel = state.hintLevel + 1;
            }
        });
        builder.addCase(fetchAssessment.fulfilled, (state, action) => {
            // check whether action is void or not
            if (!isFetchErrorOrUndefined(action)) {
                state.currentAssessmentResponse = action.payload.isAssessmentCorrect as boolean;
                state.showWaitingForEvaluation = false;
            }
        });
        builder.addCase(fetchAvailableTasks.fulfilled, (state, action) => {
            // check whether action is void or not
            if (!isFetchErrorOrUndefined(action)) {
                state.availableTasks = action.payload;
            }
        });
    }
});

function isFetchErrorOrUndefined(action: PayloadAction<any>){
    // check whether the generated fetch api returned an error
    const fetchErrorName = FetchError.name;
    return action === undefined || ('name' in action.payload && action.payload.name === fetchErrorName);
}


export const {
    propagateGraphState,
    propagateCurrentAnswer
} = applicationState.actions;
