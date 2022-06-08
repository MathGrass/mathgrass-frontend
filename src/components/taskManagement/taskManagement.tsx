import React from 'react';
import Form, {IChangeEvent} from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';
import {requestNewGraph, taskSlice} from '../../state/taskSlice';
import {generateAndDownloadFile} from '../../util/fileDownloadUtils';
import {propagateGraphState} from '../../state/graphSlice';


const TaskManagement = () => {
    const currentTaskType = useAppSelector((state) => state.taskManagement.taskType);
    const originalJointJsGraph = useAppSelector((state) => state.taskManagement.graphUneditedOriginal);
    const currentJointJsGraph = useAppSelector((state) => state.graphManagement.graphInEditor);
    const availableTaskTypes = useAppSelector((state) => state.taskManagement.availableTasks);
    const dispatch = useAppDispatch();

    const availableTaskTypesEnum:  JSONSchema7[] = [];
    availableTaskTypes.forEach((s) => {
        availableTaskTypesEnum.push({
            'enum': [s.identifier], 'title' : s.displayName
        });
    });

    const schema: JSONSchema7 = {
        'type': 'object',
        'properties': {
            'taskType': {
                'type': 'string',
                'title': 'Select Task Type',
                'oneOf': availableTaskTypesEnum
            }
        }
    };

    const uiSchema = {};

    return (
        <Form schema={schema} uiSchema={uiSchema} onChange={(e: IChangeEvent) => {
            dispatch(requestNewGraph(e.formData.taskType));
            // after having requested a new graph, the new graph must be rendered
            dispatch(propagateGraphState(originalJointJsGraph));
        }}>
            <p>
            or...
                <p>
                    <button className="btn btn-info" onClick={(event) => generateAndDownloadFile(JSON.stringify(currentJointJsGraph), 'MathGrass-graph.json')}>Export the current graph.</button>
                </p>
            </p>
        </Form>);
};

export default TaskManagement;