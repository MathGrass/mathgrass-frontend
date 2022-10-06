import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import * as serverConfig from '../config/serverConfig';
import {AbstractGraph, Edge, Vertex} from './model/abstractGraphModel';

interface ApplicationState {
    taskType: string | undefined;
    taskId: string | undefined;
    currentAbstractGraph: AbstractGraph | undefined;
    graphUneditedOriginal: any;
    graphInEditor: any;
    jsonFormDescription: JsonFormTuple | undefined;
    hintLevel: number;
    currentTask: Task | null;
    availableTasks: Task[];
    showFeedbackSection: boolean;
    assessmentFeedback: string | undefined;
    currentHintFeedback: string | undefined;
    feedbackHistory: string [];
}

export interface Task {
    taskId: number;
    displayName: string;
    graph: AbstractGraph | null;
    questions: Question[] | null;
}

export interface Question {
    question: string;
    possibleAnswer: string[];
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
        currentTask: null,
        showFeedbackSection: false,
        assessmentFeedback: undefined,
        currentHintFeedback: undefined,
        feedbackHistory: [] as string[],
        currentAbstractGraph: undefined,
        availableTasks: [] as Task[]
    };
}

const initialTaskState: ApplicationState = getInitialApplicationState();
export const applicationState = createSlice({
    name: 'tasks', initialState: initialTaskState, reducers: {
        propagateGraphState: (state, action: PayloadAction<any>) => {
            state.graphInEditor = action.payload;
        }, requestAssessment: (state) => {
            state.showFeedbackSection = true;
            state.assessmentFeedback = 'This is the assessment of the given task.';
        }, requestHint: (state) => {
            // Push old current hint to hint history
            if (state.currentHintFeedback !== undefined) {
                state.feedbackHistory.push(state.currentHintFeedback);
            }
            // request new hint and set it accordingly
            state.currentHintFeedback = 'This is a hint.';
        }
    }, extraReducers: (builder) => {
        builder.addCase(fetchTaskById.fulfilled, (state, action) => {
            // check whether action is void or not
            if (action.payload !== undefined) {
                state.currentTask = action.payload as Task;
                // Handle fetch by id logic
                // state.availableTasks = action.payload as number[];
            }
        });
        builder.addCase(fetchHint.fulfilled, (state, action) => {
            //
        });
        builder.addCase(fetchAssessment.fulfilled, (state, action) => {
            //
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
                    from: e.from, to: e.to
                };
                edges.push(edge);
            });

            const questions: Question[] = [];

            obj.questions.forEach((q: any) => {
                questions.push({
                    question: q.question, possibleAnswer: q.possibleAnswers
                });
            });

            const task: Task = {
                taskId: obj.identifier, displayName: obj.displayName, graph: {
                    vertices, edges
                }, questions
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
                    graph: null, displayName: e.displayName, taskId: e.id, questions: null
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
    return fetch(serverConfig.getNextHint(params.taskId, params.hintLevel)).then((response) => response.json()).then((json) => {
        // handle logic
    });
});

export const fetchAssessment = createAsyncThunk('api/fetchAssessment', async () => {
    //
});

export const {
    propagateGraphState, requestAssessment, requestHint
} = applicationState.actions;
// export default applicationState.reducer;
