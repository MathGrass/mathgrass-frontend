import React from 'react';
import Form, {IChangeEvent} from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';
import {requestNewGraph, applicationState, propagateGraphState, TaskTuple} from '../../state/applicationState';

const TaskManagement = () => {
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
        },
        'required': ['taskType']
    };

    const uiSchema = {};

    return (
        <Form schema={schema} uiSchema={uiSchema} onChange={(e: IChangeEvent) => {
            // upon initial rendering of the form, onchange event is emitted
            // therefore, check for set task type and act accordingly
            if(e.formData.taskType === undefined){
                return;
            }
            dispatch(requestNewGraph(e.formData.taskType));
        }}>
            {/*empty child for hiding submit button*/}
            <div>{}</div>
        </Form>);
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