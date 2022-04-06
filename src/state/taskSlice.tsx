import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as joint from "jointjs";
import {JSONSchema7} from "json-schema";
import {UiSchema} from "@rjsf/core";
import {getDemoAssessmentSchema} from "./initialResources/demoQuestionSchema";

interface TaskState {
    taskType: string;
    taskId: string;
    graphPayload: any;
    questionSchema: AssessmentSchema
}

export interface AssessmentSchema {
    schema: JSONSchema7
    uiSchema: UiSchema
}

function getInitialTaskState(): TaskState {
    return {
        taskType: 'randomTaskType',
        taskId: 'randomId',
        graphPayload: undefined,
        questionSchema: getDemoAssessmentSchema()
    };
}

const initialState: TaskState = getInitialTaskState();

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        requestNewGraph: (state, action: PayloadAction<string>) => {
            state.taskId = String(Math.floor(Math.random() * 123));
            state.graphPayload = new joint.dia.Graph({}, {cellNamespace: joint.shapes}).toJSON();
        }
    }
});

export const { requestNewGraph } = taskSlice.actions;
export default taskSlice.reducer;