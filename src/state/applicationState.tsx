import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import * as serverConfig from '../config/serverConfig';
import {devServerConfig} from '../config/serverConfig';
import {DefaultApi, Task, TaskIdLabelTuple} from '../src-gen/mathgrass-api';

const api = new DefaultApi(devServerConfig.apiConfig);

interface ApplicationState {
    graphInEditor: any;
    hintLevel: number;
    currentTask: Task | null;
    currentAssessmentResponse: boolean | null;
    availableTasks: TaskIdLabelTuple[];
    showFeedbackSection: boolean;
    assessmentFeedback: string | undefined;
    currentAnswer: string | undefined;
    feedbackHistory: string [];
}

export interface Question {
    question: string;
    possibleAnswer: string[];
    isDynamicQuestion: boolean;
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
        assessmentFeedback: undefined,
        feedbackHistory: [] as string[],
        availableTasks: [] as TaskIdLabelTuple[],
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
        },
    }, extraReducers: (builder) => {
        builder.addCase(fetchTaskById.fulfilled, (state, action) => {
            // check whether action is void or not
            if (action.payload !== undefined) {
                state.currentTask = action.payload as Task;
                state.currentAssessmentResponse = null;
                // Handle fetch by id logic
                // state.availableTasks = action.payload as number[];
            }
        });
        builder.addCase(fetchHint.fulfilled, (state, action) => {
            // check whether action is void or not
            if (action.payload !== undefined) {
                state.feedbackHistory.push(action.payload.content as string);
                state.hintLevel = state.hintLevel + 1;
            }
        });
        builder.addCase(fetchDynamicAssessment.fulfilled, (state, action) => {
            // check whether action is void or not
            if (action.payload !== undefined) {
                state.currentAssessmentResponse = action.payload.answerTrue as boolean;
            }
        });
        builder.addCase(fetchStaticAssessment.fulfilled, (state, action) => {
            // check whether action is void or not
            if (action.payload !== undefined) {
                state.currentAssessmentResponse = action.payload.isAssessmentCorrect as boolean;
            }
        });
        builder.addCase(fetchAvailableTasks.fulfilled, (state, action) => {
            // check whether action is void or not
            if (isFetchErrorOrUndefined(action)) {
                state.availableTasks = action.payload;
            }
        });
    }
});

function isFetchErrorOrUndefined(action: PayloadAction<any>){
    // check whether the generated fetch api returned an error
    const fetchErrorName = 'FetchError';
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
    const nextHintResource: string = serverConfig.getNextHint(params.taskId, params.hintLevel);
    return fetch(nextHintResource).then((response) =>
        response.json()
    ).then((json) => {
        return json;
    });
});

export const fetchDynamicAssessment = createAsyncThunk('api/fetchDynamicAssessment', async (params: {
    taskId: number, answer: string
}) => {
    return fetch(serverConfig.getDynamicAssessmentUrl(params.taskId), {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            'answer': params.answer
        })
    }).then((response) => response.json()).then((json) => {
        const resultId: number = json;
        return fetch(serverConfig.getAssessmentLongPollingUrl(resultId)).then((result) => result.json()).then((assessmentJson) => {
            return assessmentJson;
        });
    }).catch(() => {
        //
    });
});

export const fetchStaticAssessment = createAsyncThunk('api/fetchStaticAssessment', async (params: {
    taskId: number, answer: string
}) => {
    return api.runStaticAssessment({
        taskId: params.taskId,
        runStaticAssessmentRequest: {
            answer: params.answer
        }
    }).then((result) => result).catch((reason) => reason);
});


export const {
    propagateGraphState,
    propagateCurrentAnswer
} = applicationState.actions;
// export default applicationState.reducer;
