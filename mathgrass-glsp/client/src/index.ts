/********************************************************************************
 * Copyright (c) 2024 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

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
import { MessageConnection } from 'vscode-jsonrpc';
import createContainer from './di.config';

export class GLSPModelClient {

    private clientId = 'sprotty';
    private webSocketUrl = `ws://localhost:${this.port}/${this.id}`;

    private glspClient: GLSPClient;
    private container: Container;
    private wsProvider: GLSPWebSocketProvider;

    constructor(private port: number, private id: string, private diagramType: string, private filePath: string) {
        this.wsProvider = new GLSPWebSocketProvider(this.webSocketUrl);
    }

    public bindGLSPModelClient(containerId?: string): void{
        this.clientId = containerId ?? this.clientId;
        console.log(this.clientId);
        this.wsProvider.listen({ onConnection: this.initialize.bind(this), onReconnect: this.reconnect.bind(this), logger: console });
    }

    public unbindGLSPModelClient(): void {
        this.glspClient.stop();
    }

    private async initialize(connectionProvider: MessageConnection, isReconnecting = false): Promise<void> {
        this.glspClient = new BaseJsonrpcGLSPClient({ id: this.id, connectionProvider });
        console.log(this.clientId);
        this.container = createContainer({
            clientId: this.clientId,
            diagramType: this.diagramType,
            glspClientProvider: async () => this.glspClient,
            sourceUri: this.filePath
        });
        const actionDispatcher = this.container.get(GLSPActionDispatcher);
        const diagramLoader = this.container.get(DiagramLoader);
        await diagramLoader.load({ requestModelOptions: { isReconnecting } });

        if (isReconnecting) {
            const message = `Connection to the ${this.id} glsp server got closed. Connection was successfully re-established.`;
            const timeout = 5000;
            const severity = 'WARNING';
            actionDispatcher.dispatchAll([
                StatusAction.create(message, { severity, timeout }),
                MessageAction.create(message, { severity })
            ]);
            return;
        }
    }

    private async reconnect(connectionProvider: MessageConnection): Promise<void> {
        this.glspClient.stop();
        this.initialize(connectionProvider, true /* isReconnecting */);
    }

}

export default GLSPModelClient;
