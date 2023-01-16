import {Configuration} from '../src-gen/mathgrass-api';

export interface MathGrassConfig {
    readonly serverUrl: string;
    readonly getAllTasks: string;
    readonly submitDynamicAssessmentPath: string;
    readonly submitStaticAssessmentPath: string;
    readonly requestHintsPath: string;
    readonly domContainerId: string;
    readonly getTaskByIdUrl: string;
    readonly getAssessmentPath: string;
    readonly taskResultLongPollingUrl: string;
    readonly apiConfig: Configuration;
}

export function getAllTasksUrl() : string  {
    return devServerConfig.serverUrl + devServerConfig.getAllTasks;
}

export function getServerConfig() : MathGrassConfig {
    return devServerConfig;
}

export function getTaskByIdUrl(id: number): string{
    return devServerConfig.serverUrl + devServerConfig.getTaskByIdUrl + '/' + id;
}

export function getNextHint(taskId: number, hintLevel: number): string {
    return devServerConfig.serverUrl + devServerConfig.getTaskByIdUrl + '/' + taskId + '/hint/' + hintLevel;
}

export function getDynamicAssessmentUrl(taskId: number): string {
    return devServerConfig.serverUrl + devServerConfig.submitDynamicAssessmentPath + '/' + taskId;
}

export function getStaticAssessmentUrl(taskId: number): string {
    return devServerConfig.serverUrl + devServerConfig.submitStaticAssessmentPath + '/' + taskId;
}

export function getAssessmentLongPollingUrl(resultId: number): string {
    return devServerConfig.serverUrl + devServerConfig.taskResultLongPollingUrl + '/' + resultId;
}

const serverUrl: string = 'http://localhost:8080';

// TODO - fetch from external config or app constructor
export const devServerConfig : MathGrassConfig = {
    serverUrl,
    getAllTasks: 'task',
    getTaskByIdUrl: 'task',
    submitDynamicAssessmentPath: 'evaluator/runTask',
    submitStaticAssessmentPath: 'evaluator/staticEvaluation',
    getAssessmentPath: 'evaluator/taskResult',
    requestHintsPath: 'requestHint',
    domContainerId: 'root',
    taskResultLongPollingUrl: 'evaluator/longPollTaskResult',
    apiConfig: new Configuration({
        basePath: serverUrl,
    })
};