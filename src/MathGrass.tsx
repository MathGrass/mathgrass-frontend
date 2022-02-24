import React from 'react';
import GraphEditor from "./Components/GraphEditor/GraphEditor";
import Assessment from "./Components/Assessment/Assessment";
import IncrementalHints from "./Components/IncrementalHints/IncrementalHints";


class MathGrass extends React.Component {
    render(){
        return (
            <div>
                <GraphEditor />
                <Assessment />
                <IncrementalHints />
            </div>

        );
    }
}

export default MathGrass;


