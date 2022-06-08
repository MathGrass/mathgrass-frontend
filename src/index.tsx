import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MathGrass from './mathGrass';
import {store} from './state/common/store';
import {getServerConfig} from './config/serverConfig';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <MathGrass/>
        </Provider>
    </React.StrictMode>, document.getElementById(getServerConfig().domContainerId));



