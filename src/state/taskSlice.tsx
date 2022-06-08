import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as joint from 'jointjs';
import {JSONSchema7} from 'json-schema';
import {UiSchema} from '@rjsf/core';
import {getDemoAssessmentSchema} from './initialResources/demoQuestionSchema';

interface TaskState {
    taskType: string;
    taskId: string;
    graphPayload: any;
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
        graphPayload: undefined,
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
export const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        requestNewGraph: (state, action: PayloadAction<string>) => {
            state.taskId = String(Math.floor(Math.random() * 123));
            state.graphPayload = new joint.dia.Graph({}, {cellNamespace: joint.shapes}).toJSON();
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

/*
export const { exportGraph } = graphSlice.actions;
export default graphSlice.reducer;*/
