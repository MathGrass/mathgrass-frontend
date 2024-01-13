// create async thunk for fetching task types. Can be dispatched like a regular reducer. Results are processed in extraReducers
import {createAsyncThunk} from '@reduxjs/toolkit';
import {DefaultApi} from '../src-gen/mathgrass-api';
import {devServerConfig} from '../config/serverConfig';

const api = new DefaultApi(devServerConfig.apiConfig);

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