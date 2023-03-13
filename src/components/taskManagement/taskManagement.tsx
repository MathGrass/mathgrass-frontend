import React from 'react';
import Form, {IChangeEvent} from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';
import {fetchTaskById} from '../../state/applicationState';
import {Task, TaskIdLabelTuple} from '../../src-gen/mathgrass-api';

const TaskManagement = () => {
    const availableTasks = useAppSelector((state) => state.applicationStateManagement.availableTasks);
    const currentTask: Task | null = useAppSelector((state) => state.applicationStateManagement.currentTask);

    const dispatch = useAppDispatch();

    const availableTaskTypesEnum: JSONSchema7[] = availableTasksToTaskTypesEnum(availableTasks);

    const schema: JSONSchema7 = {
        'type': 'number',
        'anyOf': availableTaskTypesEnum,
        ... (currentTask !== null ? {'default' : currentTask.id} : {} )
    };

    const uiSchema = {};

    function renderTaskSelectionForm() {
        return <Form schema={schema} uiSchema={uiSchema} onSubmit={(e: IChangeEvent) => {
            // upon initial rendering of the form, onchange event is emitted
            // therefore, check for set task type and act accordingly
            if (e.formData === undefined) {
                return;
            }else {
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

function availableTasksToTaskTypesEnum(availableTaskTypes: TaskIdLabelTuple[]): JSONSchema7[] {
    const availableTaskTypesEnum: JSONSchema7[] = [];

    if (availableTaskTypes !== undefined) {
        availableTaskTypes.forEach((tt) => {
            availableTaskTypesEnum.push({
                'type': 'number',
                'title': tt.label,
                'enum': [
                    tt.id
                ]
            });
        });
    }

    return availableTaskTypesEnum;
}

export default TaskManagement;