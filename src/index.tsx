import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MathGrass from './mathGrass';
import {store} from './state/common/store';
import * as serverConfig from './config/serverConfig';
import {MathGrassConfig} from './config/serverConfig';
import client from "./websockets/client";

function renderApp() {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <MathGrass/>
            </Provider>
        </React.StrictMode>, document.getElementById(serverConfig.getServerConfig().domContainerId));
}

// TODO - for instantiating the application externally
export function MathGrassApplication(config: MathGrassConfig){
    renderApp();
}

renderApp();
// @ts-ignore
const callback = function (message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
        alert('got message with body ' + message.body);
    } else {
        alert('got empty message');
    }
};

client.activate()
while (!client.active) {
    console.log("Client not active")
}
if (client.connected) {
    client.subscribe("/topic/resultSubmitted", callback)
}
