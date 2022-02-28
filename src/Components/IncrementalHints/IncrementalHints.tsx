import React from 'react';
import {JSONSchema7} from "json-schema";
import Form from "@rjsf/core";

type IncrementalHintsProps = {}

type IncrementalHintsState = {}


class IncrementalHints extends React.Component {
    constructor(props: IncrementalHintsProps, state: IncrementalHintsState) {
        super(props);
        this.state = {}
    }

    submitRequestHint(): void {
    }

    render() {
        const schema: JSONSchema7 = {
            title: "Request Hint",
            type: "object",
            properties: {
                hintLevel: {type: "number", title: "hintLevel"}
            }
        };

        const uiSchema = {
            hintLevel: {
                "ui:widget": "hidden"
            }
        };

        return (<Form schema={schema}
                      uiSchema={uiSchema}
                      onSubmit={this.submitRequestHint}
        />);
    }


}

export default IncrementalHints;
