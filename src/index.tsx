import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MathGrass from './mathGrass';
import {store} from './state/common/store';
import * as serverConfig from './config/serverConfig';
import {MathGrassConfig} from './config/serverConfig';


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




