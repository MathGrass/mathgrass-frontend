import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MathGrass from './MathGrass';
import {store} from "./state/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <MathGrass
                assessmentServerUrl={"http://localhost:8889"}
            />
        </Provider>
    </React.StrictMode>
    ,
    document.getElementById('root')
)
;



