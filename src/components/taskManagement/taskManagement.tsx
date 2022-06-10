import React from 'react';
import Form, {IChangeEvent} from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';
import {requestNewGraph, applicationState, propagateGraphState, TaskTuple} from '../../state/applicationState';

const TaskManagement = () => {
    const currentTaskType = useAppSelector((state) => state.applicationStateManagement.taskType);
    const availableTaskTypes = useAppSelector((state) => state.applicationStateManagement.availableTasks);
    const dispatch = useAppDispatch();

    const availableTaskTypesEnum:  JSONSchema7[] = availableTasksToTaskTypesEnum(availableTaskTypes);

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
        }}/>);
};

function availableTasksToTaskTypesEnum(availableTaskTypes: TaskTuple[]): JSONSchema7[] {
    const availableTaskTypesEnum : JSONSchema7[] = [];
    availableTaskTypes.forEach((tt) => {
        availableTaskTypesEnum.push({
            'enum': [tt.identifier], 'title' : tt.displayName
        });
    });
    return availableTaskTypesEnum;
}

export default TaskManagement;