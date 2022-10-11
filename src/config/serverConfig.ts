export interface MathGrassConfig {
    readonly getNextHint: string;
    readonly serverUrl: string;
    readonly getAllTasks: string;
    readonly submitAssessmentPath: string;
    readonly requestHintsPath: string;
    readonly domContainerId: string;
    readonly getTaskByIdUrl: string;
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

// TODO - fetch from external config or app constructor
const devServerConfig : MathGrassConfig = {
    serverUrl: 'http://localhost:8080/',
    getAllTasks: 'tasks',
    getTaskByIdUrl: 'task',
    submitAssessmentPath: 'submitAssessment',
    requestHintsPath: 'requestHint',
    domContainerId: 'root',
    getNextHint: 'hint'
};