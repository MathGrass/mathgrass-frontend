import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.css";
// import MathGrass from './mathGrass';
import {store} from './state/common/store';
import * as serverConfig from './config/serverConfig';
import {MathGrassConfig} from './config/serverConfig';
import App from './admin-components/App';
import { BrowserRouter } from 'react-router-dom';


function renderApp() {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
            </BrowserRouter>
        </React.StrictMode>, document.getElementById(serverConfig.getServerConfig().domContainerId));
}

// TODO - for instantiating the application externally
export function MathGrassApplication(config: MathGrassConfig){
    renderApp();
}

renderApp();




