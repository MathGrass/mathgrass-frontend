import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import * as serverConfig from '../config/serverConfig';
import {AbstractGraph, Edge, Vertex} from './model/abstractGraphModel';

interface ApplicationState {
    graphInEditor: any;
    hintLevel: number;
    currentTask: Task | null;
    currentAssessmentResponse: boolean | null;
    availableTasks: Task[];
    showFeedbackSection: boolean;
    assessmentFeedback: string | undefined;
    currentAnswer: string | undefined;
    feedbackHistory: string [];
}

export interface Task {
    taskId: number;
    displayName: string;
    graph: AbstractGraph | null;
    question: Question | null;
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
        availableTasks: [] as Task[],
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
        propagateCurrentAssessmentResponse: (state, action: PayloadAction<boolean>) => {
            state.currentAssessmentResponse = action.payload;
        }
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
        builder.addCase(fetchAvailableTasks.fulfilled, (state, action) => {
            // check whether action is void or not
            if (action.payload !== undefined) {
                state.availableTasks = action.payload;
            }
        });
    }
});

// create async thunk for fetching task types. Can be dispatched like a regular reducer. Results are processed in extraReducers
export const fetchTaskById = createAsyncThunk('api/fetchTaskById', async (id: number) => {
    const taskByIdUrl = serverConfig.getTaskByIdUrl(id);
    return fetch(taskByIdUrl)
        .then((response) => response.json())
        .then((obj) => {
            // extract vertices
            const vertices: Vertex[] = [];
            obj.graph.vertices.forEach((v: any) => {
                const vertex: Vertex = {
                    id: v.id, x: v.x, y: v.y, label: v.label
                };
                vertices.push(vertex);
            });

            // extract edges
            const edges: Edge[] = [];
            obj.graph.edges.forEach((e: any) => {
                const edge: Edge = {
                    from: e.firstVertex.id, to: e.secondVertex.id
                };
                edges.push(edge);
            });

            let questionString: string;
            let isDynamicQuestionFromResult: boolean;
            if (obj.question == null) {
                questionString = obj.template.question;
                isDynamicQuestionFromResult = true;
            } else {
                questionString = obj.question;
                isDynamicQuestionFromResult = false;
            }

            const question: Question = {
                question: questionString, possibleAnswer: [], isDynamicQuestion: isDynamicQuestionFromResult
            };

            const task: Task = {
                taskId: obj.id,
                displayName: obj.label,
                graph: {
                    vertices, edges
                },
                question
            };
            return task;
        })
        .catch(() => {
            return undefined;
        });
});

export const fetchAvailableTasks = createAsyncThunk('api/fetchAvailableTasks', async () => {
    return fetch(serverConfig.getAllTasksUrl())
        .then((response) => response.json())
        .then((json) => {
            const result: Task[] = [];
            json.forEach((e: any) => {
                result.push({
                    graph: null, displayName: e.label, taskId: e.id, question: null
                });
            });
            return result;
        })
        .catch(() => {
            return undefined;
        });
});

export const fetchHint = createAsyncThunk('api/fetchHint', async (params: {
    taskId: number, hintLevel: number
}) => {
    const nextHintResource : string = serverConfig.getNextHint(params.taskId, params.hintLevel);
    return fetch(nextHintResource).then((response) =>
        response.json()
    ).then((json) => {
        return json;
    });
});

export const {
    propagateGraphState,
    propagateCurrentAnswer,
    propagateCurrentAssessmentResponse
} = applicationState.actions;
