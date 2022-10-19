export interface MathGrassConfig {
    readonly getNextHint: string;
    readonly serverUrl: string;
    readonly getAllTasks: string;
    readonly submitAssessmentPath: string;
    readonly requestHintsPath: string;
    readonly domContainerId: string;
    readonly getTaskByIdUrl: string;
    readonly getAssessmentPath: string;
    readonly taskResultLongPollingUrl: string;
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
    return devServerConfig.serverUrl + devServerConfig.getNextHint + '/' + taskId + '/' + hintLevel;
}

export function getAssessmentUrl(taskId: number): string {
    return devServerConfig.serverUrl + devServerConfig.submitAssessmentPath + '/' + taskId;
}

export function getAssessmentLongPollingUrl(resultId: number): string {
    return devServerConfig.serverUrl + devServerConfig.taskResultLongPollingUrl + '/' + resultId;
}

export function getAssessmentPath(resultId: number): string {
    return devServerConfig.serverUrl + devServerConfig.getAssessmentPath + '/' + resultId;
}

// TODO - fetch from external config or app constructor
const devServerConfig : MathGrassConfig = {
    serverUrl: 'http://localhost:8080/',
    getAllTasks: 'task',
    getTaskByIdUrl: 'task',
    submitAssessmentPath: 'evaluator/runTask',
    getAssessmentPath: 'evaluator/taskResult',
    requestHintsPath: 'requestHint',
    domContainerId: 'root',
    getNextHint: 'hint',
    taskResultLongPollingUrl: 'evaluator/longPollTaskResult'
};