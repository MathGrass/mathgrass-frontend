import React from 'react';
import ReactDOM from 'react-dom';
import MathGrass from './MathGrass';


ReactDOM.render(
    <React.StrictMode>
        <MathGrass
            assessmentServerUrl={"http://localhost:8889"}
        />
    </React.StrictMode>,
    document.getElementById('root')
);



