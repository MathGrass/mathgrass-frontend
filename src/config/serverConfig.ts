
export interface MathGrassConfig {
    readonly serverUrl: string;
    readonly taskTypesQueryPath: string;
    readonly submitAssessmentPath: string;
    readonly requestHintsPath: string;
    readonly domContainerId: string;
}

export function getServerConfig() : MathGrassConfig  {
    return devServerConfig;
}

const devServerConfig : MathGrassConfig = {
    serverUrl: 'http://localhost:3001/',
    taskTypesQueryPath: 'availableTaskTypes',
    submitAssessmentPath: 'submitAssessment',
    requestHintsPath: 'requestHint',
    domContainerId: 'root'
};