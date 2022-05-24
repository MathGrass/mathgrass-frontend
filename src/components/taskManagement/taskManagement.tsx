import React from 'react';
import Form from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';
import {taskSlice} from '../../state/taskSlice';


const TaskManagement = () => {
    const currentTaskType = useAppSelector((state) => state.taskManagement.taskType);
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


    return (
        <Form schema={schema} uiSchema={uiSchema}>
            or..
            <br/>
            <br/>
            You may also <a href="#">export</a> the current graph.
            <br />
            Task Type: {currentTaskType}
        </Form>);
};

export default TaskManagement;