import 'reflect-metadata';

import {
    BaseJsonrpcGLSPClient,
    DiagramLoader,
    GLSPActionDispatcher,
    GLSPClient,
    GLSPWebSocketProvider,
    MessageAction,
    StatusAction
} from '@eclipse-glsp/client';
import { Container } from 'inversify';
import { join, resolve } from 'path';
import { MessageConnection } from 'vscode-jsonrpc';
import createContainer from './di.config';


const port = 8081;
const id = 'workflow';
const diagramType = 'workflow-diagram';

const loc = window.location.pathname;
const currentDir = "examples/workflow-standalone/app" // loc.substring(0, loc.lastIndexOf('/'));
const examplePath = join(currentDir, '../app/example1.wf');
const clientId = 'sprotty';

const webSocketUrl = `ws://localhost:${port}/${id}`;

let glspClient: GLSPClient;
let container: Container;
const wsProvider = new GLSPWebSocketProvider(webSocketUrl, { reconnecting: false });

async function initialize(connectionProvider: MessageConnection, isReconnecting = false): Promise<void> {
    glspClient = new BaseJsonrpcGLSPClient({ id, connectionProvider });
    container = createContainer({ clientId, diagramType, glspClientProvider: async () => glspClient, sourceUri: examplePath });
    const actionDispatcher = container.get(GLSPActionDispatcher);
    const diagramLoader = container.get(DiagramLoader);
    await diagramLoader.load({ requestModelOptions: { isReconnecting } });

    if (isReconnecting) {
        const message = `Connection to the ${id} glsp server got closed. Connection was successfully re-established.`;
        const timeout = 5000;
        const severity = 'WARNING';
        actionDispatcher.dispatchAll([StatusAction.create(message, { severity, timeout }), MessageAction.create(message, { severity })]);
        return;
    }
}

async function reconnect(connectionProvider: MessageConnection): Promise<void> {
    glspClient.stop();
    initialize(connectionProvider, true /* isReconnecting */);
}

export function mountGlspClient() {
    wsProvider.listen({ onConnection: initialize, onReconnect: reconnect, logger: console });
}

export async function unmountGlspClient() {
    glspClient.stop();
}
