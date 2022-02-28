import React from 'react';
import {JSONSchema7} from "json-schema";
import Form from "@rjsf/core";

type IncrementalHintsProps = {}

type IncrementalHintsState = {
    hintLevel : number
}


class IncrementalHints extends React.Component<IncrementalHintsProps, IncrementalHintsState> {

    constructor(props: IncrementalHintsProps, state: IncrementalHintsState) {
        super(props);
        this.state = {
            hintLevel: 0
        };
        this.submitRequestHint = this.submitRequestHint.bind(this);
    }

    submitRequestHint(): void {
        const currentHintLevel : number = this.state.hintLevel;
        this.state = {
            hintLevel: currentHintLevel + 1
        }
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
