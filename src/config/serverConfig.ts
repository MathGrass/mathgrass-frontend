export interface MathGrassConfig {
    readonly serverUrl: string;
    readonly taskTypesQueryPath: string;
    readonly submitAssessmentPath: string;
    readonly requestHintsPath: string;
    readonly domContainerId: string;
}

export function getTaskTypesUrl() : string  {
    return devServerConfig.serverUrl + devServerConfig.taskTypesQueryPath;
}

export function getServerConfig() : MathGrassConfig {
    return devServerConfig;
}

// TODO - fetch from external config or app constructor
const devServerConfig : MathGrassConfig = {
    serverUrl: 'http://localhost:8080/',
    taskTypesQueryPath: 'availableTaskTypes',
    submitAssessmentPath: 'submitAssessment',
    requestHintsPath: 'requestHint',
    domContainerId: 'root'
};