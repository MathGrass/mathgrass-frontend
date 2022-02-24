import React from "react";
import Form from "@rjsf/core";
import { JSONSchema7 } from "json-schema";

function submitStudentAssessment() : void {

}

class Assessment extends React.Component {

    render() {
        const schema : JSONSchema7 = {
            title: "Graph Assessment",
            type: "object",
            required: ["isPlanar"],
            properties: {
                isPlanar: {type: "boolean", title: "Is the graph planar?"}
            }
        };

        const uiSchema =  {
            isPlanar: {
                "ui:widget": "radio"
            }
        };



        return (<Form schema={schema}
                      uiSchema={uiSchema}
                      onSubmit={submitStudentAssessment}/>);
    }
}

export default Assessment;