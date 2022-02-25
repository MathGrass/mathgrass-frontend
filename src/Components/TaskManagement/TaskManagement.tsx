import React from "react";
import Form from "@rjsf/core";
import { JSONSchema7 } from "json-schema";


class TaskManagement extends React.Component {

    render() {
        const schema : JSONSchema7 = {
            "type": "object",
            "properties": {
                "taskType": {
                    "type": "string",
                    "title": "Select Task Type",
                    "enum": [
                        "Planarity",
                        "Bipartite Graphs",
                        "Eulerian Graphs"
                    ]
                }
            }
        }

        const uiSchema =  {

        };


        return (
            <Form schema={schema} uiSchema={uiSchema}>
                or..
                <br/>
                <a href="#">Skip this graph</a> and request a new graph for the same problem.
            </Form>);
    }
}

export default TaskManagement;