import React from 'react';
import Form, {IChangeEvent} from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';
import {fetchTaskById, requestTask, Task} from '../../state/applicationState';

const TaskManagement = () => {
    const currentTask = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const availableTasks = useAppSelector((state) => state.applicationStateManagement.availableTasks);
    const dispatch = useAppDispatch();

    const availableTaskTypesEnum: JSONSchema7[] = availableTasksToTaskTypesEnum(availableTasks);

    const schema: JSONSchema7 = {
        'type': 'number',
        'anyOf': availableTaskTypesEnum
    };

    const uiSchema = {};

    function renderTaskSelectionForm() {
        return <Form schema={schema} uiSchema={uiSchema} onSubmit={(e: IChangeEvent) => {
            // upon initial rendering of the form, onchange event is emitted
            // therefore, check for set task type and act accordingly
            if (typeof(e.formData) === 'number') {
                dispatch(fetchTaskById(e.formData));
            }
        }}/>;
    }

    return (
        <>
            {availableTasks.length !== 0 ? renderTaskSelectionForm() : 'Could not fetch any data or parse the response. Please check your internet connections or server settings.'}
        </>
    );
};

function availableTasksToTaskTypesEnum(availableTaskTypes: Task[]): JSONSchema7[] {
    const availableTaskTypesEnum: JSONSchema7[] = [];

    /*    {
            "type": "number",
            "title": "one",
            "enum": [
            1
            ]
        }*/

    if (availableTaskTypes !== undefined) {
        availableTaskTypes.forEach((tt) => {
            availableTaskTypesEnum.push({
                'type': 'number',
                'title': tt.displayName,
                'enum': [
                    tt.identifier
                ]
            });
        });
    }

    return availableTaskTypesEnum;
}

export default TaskManagement;