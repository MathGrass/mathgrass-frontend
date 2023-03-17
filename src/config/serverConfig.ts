import {Configuration} from '../src-gen/mathgrass-api';

export interface MathGrassConfig {
    readonly serverUrl: string;
    readonly domContainerId: string;
    readonly apiConfig: Configuration;
}


export function getServerConfig() : MathGrassConfig {
    return devServerConfig;
}

const serverUrl: string = 'http://localhost:8080';

// TODO - fetch from external config or app constructor
export const devServerConfig : MathGrassConfig = {
    serverUrl,
    domContainerId: 'root',
    apiConfig: new Configuration({
        basePath: serverUrl,
    })
};