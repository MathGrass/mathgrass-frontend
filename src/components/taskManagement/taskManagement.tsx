import React from 'react';
import Form from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';
import {taskSlice} from '../../state/taskSlice';
import {generateAndDownloadFile} from '../../util/fileDownloadUtils';


const TaskManagement = () => {
    const currentTaskType = useAppSelector((state) => state.taskManagement.taskType);
    const currentJointJsGraph = useAppSelector((state) => state.graphManagement.graphInEditor);
    const dispatch = useAppDispatch();

    const availableTaskTypes = [
        {'enum': ['planarity'], 'title' : 'Planarity'},
        {'enum': ['bipartite'], 'title' : 'Bipartite Graphs'}
    ];

    const schema: JSONSchema7 = {
        'type': 'object',
        'properties': {
            'taskType': {
                'type': 'string',
                'title': 'Select Task Type',
                'oneOf': availableTaskTypes
            }
        }
    };

    const uiSchema = {};

    function asd() {
        alert('hi');
    }

    return (
        <Form schema={schema} uiSchema={uiSchema}>
            <p>
            or...
                <p>
                    <button className="btn btn-info" onClick={(event) => generateAndDownloadFile(JSON.stringify(currentJointJsGraph), 'MathGrass-graph.json')}>Export the current graph.</button>
                </p>
            </p>
        </Form>);
};

export default TaskManagement;