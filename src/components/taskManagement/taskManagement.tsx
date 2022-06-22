import React from 'react';
import Form, {IChangeEvent} from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';
import {requestNewGraph, TaskTuple} from '../../state/applicationState';

const TaskManagement = () => {
    const availableTaskTypes = useAppSelector((state) => state.applicationStateManagement.availableTaskTypes);
    const currentTaskType = useAppSelector((state) => state.applicationStateManagement.taskType);
    const dispatch = useAppDispatch();

    const availableTaskTypesEnum:  JSONSchema7[] = availableTasksToTaskTypesEnum(availableTaskTypes);

    const schema: JSONSchema7 = {
        'type': 'object',
        'properties': {
            'taskType': {
                'type': 'string',
                'title': 'Select Task Type',
                'oneOf': availableTaskTypesEnum,
                ...(currentTaskType !== undefined) ? {'default': currentTaskType} : {}
            }
        },
        'required': ['taskType']
    };

    const uiSchema = {};

    function renderTaskSelectionForm() {
        return <Form schema={schema} uiSchema={uiSchema} onSubmit={(e: IChangeEvent) => {
            // upon initial rendering of the form, onchange event is emitted
            // therefore, check for set task type and act accordingly
            if (e.formData.taskType === undefined) {
                return;
            } else {
                dispatch(requestNewGraph(e.formData.taskType));
            }
        }}/>;
    }

    return (
        <>
            {availableTaskTypes.length !== 0 ? renderTaskSelectionForm() : 'Could not fetch any data or parse the response. Please check your internet connections or server settings.'}
        </>
        );
};

function availableTasksToTaskTypesEnum(availableTaskTypes: TaskTuple[]): JSONSchema7[] {
    const availableTaskTypesEnum : JSONSchema7[] = [];

    if(availableTaskTypes !== undefined){
        availableTaskTypes.forEach((tt) => {
            availableTaskTypesEnum.push({
                'enum': [tt.identifier], 'title' : tt.displayName
            });
        });
    }

    return availableTaskTypesEnum;
}

export default TaskManagement;