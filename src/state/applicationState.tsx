import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import {devServerConfig} from '../config/serverConfig';
import {DefaultApi, FetchError, TaskDTO, TaskIdLabelTupleDTO} from '../src-gen/mathgrass-api';

const api = new DefaultApi(devServerConfig.apiConfig);

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

// create async thunk for fetching task types. Can be dispatched like a regular reducer. Results are processed in extraReducers
export const fetchTaskById = createAsyncThunk('api/fetchTaskById', async (id: number) => {
    return api.getTaskById({taskId: id}).then((value) => value).catch((reason) => reason);
});

export const fetchAvailableTasks = createAsyncThunk('api/fetchAvailableTasks', async () => {
    return api.getIdsOfAllTasks().then((value) => value).catch((reason) => reason);
});

export const fetchHint = createAsyncThunk('api/fetchHint', async (params: {
    taskId: number, hintLevel: number
}) => {
    return api.getHintForTask({
        taskId: params.taskId,
        hintLevel: params.hintLevel
    });
});

export const fetchAssessment = createAsyncThunk('api/fetchAssessment', async (params: {
    taskId: number, answer: string
}) => {
    return api.evaluateAnswer({
        taskId: params.taskId,
        evaluateAnswerRequest: {
            answer: params.answer
        }
    }).then((result) => result).catch((reason) => reason);
});


export const {
    propagateGraphState,
    propagateCurrentAnswer
} = applicationState.actions;
