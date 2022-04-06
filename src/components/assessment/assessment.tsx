import React from 'react';
import Form, {ISubmitEvent, UiSchema} from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';

type AssessmentState = {
    schema: JSONSchema7
    uiSchema: UiSchema
};

function submitStudentSolution(form: ISubmitEvent<any>): void {
    //
}

function getInitialState(): AssessmentState {
    return {
        schema: {
            title: 'Graph assessment',
            type: 'object',
            required: ['isPlanar'],
            properties: {
                isPlanar: {type: 'boolean', title: 'Is the graph planar?'}
            }
        },
        uiSchema: {
            isPlanar: {
                'ui:widget': 'radio'
            }
        }
    };
}

const Assessment = (props: any, state: AssessmentState) => {
    state = getInitialState();
    return (<Form schema={state.schema}
                  uiSchema={state.uiSchema}
                  onSubmit={submitStudentSolution}/>);

};

export default Assessment;