import React from "react";
import Form, {ISubmitEvent, UiSchema} from "@rjsf/core";
import {JSONSchema7} from "json-schema";
import {MathGrassProps} from "../../MathGrass";


type AssessmentState = {
    schema : JSONSchema7
    uiSchema: UiSchema
}

function submitStudentSolution(form: ISubmitEvent<any>): void {
}

function getInitialState() : AssessmentState {
    return {
        schema : {
            title: "Graph Assessment",
            type: "object",
            required: ["isPlanar"],
            properties: {
                isPlanar: {type: "boolean", title: "Is the graph planar?"}
            }
        },
        uiSchema : {
            isPlanar: {
                "ui:widget": "radio"
            }
        }
    }
}

class Assessment extends React.Component<MathGrassProps, AssessmentState> {

    constructor(props : MathGrassProps, state : AssessmentState) {
        super(props);
        this.state = getInitialState();
    }

    render() {
        return (<Form schema={this.state.schema}
                      uiSchema={this.state.uiSchema}
                      onSubmit={submitStudentSolution}/>);
    }
}

export default Assessment;