import React from 'react';
import GraphEditor from "./Components/GraphEditor/GraphEditor";
import Assessment from "./Components/Assessment/Assessment";
import IncrementalHints from "./Components/IncrementalHints/IncrementalHints";
import 'bootstrap/dist/css/bootstrap.min.css';


class MathGrass extends React.Component {
    render(){
        return (
            <div className='row'>
                <div className='col-10 border'>
                    <GraphEditor />
                </div>
                <div className='col-2 border'>
                    <Assessment />
                    <IncrementalHints />
                </div>
            </div>

        );
    }
}

export default MathGrass;


