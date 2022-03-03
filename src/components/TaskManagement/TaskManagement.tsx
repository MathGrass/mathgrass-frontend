import React from "react";
import Form from "@rjsf/core";
import {JSONSchema7} from "json-schema";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {taskManagementSlice} from "./taskManagementReducer";


const TaskManagement = () => {

    const taskType = useAppSelector((state) => state.taskManagement.taskType)
    const dispatch = useAppDispatch()

    const schema: JSONSchema7 = {
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

    const uiSchema = {};


    return (
        <Form schema={schema} uiSchema={uiSchema} onChange={e => {
            dispatch(taskManagementSlice.actions.requestStuff())
        }}>
            or..
            <br/>
            <a href="#">Skip this graph</a> and request a new graph for the same problem.
            <br/>
            You may also <a href="#">export</a> the current graph.
            <br />
            Task Type: {taskType}
        </Form>);
}

export default TaskManagement;