import React from 'react';
import GraphEditor from "./Components/GraphEditor/GraphEditor";
import AssessmentComponent from "./Components/AssessmentComponent/AssessmentComponent";


class MathGrass extends React.Component {
    render(){
        return (
            <div>
                <GraphEditor />
                <AssessmentComponent />
            </div>

        );
    }
}

export default MathGrass;


