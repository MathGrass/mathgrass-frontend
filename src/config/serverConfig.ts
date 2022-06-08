export interface MathGrassConfig {
    readonly serverUrl: string;
    readonly taskTypesQueryPath: string;
    readonly submitAssessmentPath: string;
    readonly requestHintsPath: string;
}

let serverUrl: string;

export function setServerUrl(url: string): void {
    serverUrl = url;
}

export function getServerUrl(): string {
    return serverUrl;
}