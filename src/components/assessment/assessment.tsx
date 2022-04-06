import React from 'react';
import Form, {ISubmitEvent, UiSchema} from '@rjsf/core';
import {JSONSchema7} from 'json-schema';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';

function submitStudentSolution(form: ISubmitEvent<any>): void {
    //
}



const Assessment = () => {
    const questionSchema = useAppSelector((state) => state.taskManagement.questionSchema);

    return (<Form schema={questionSchema.schema}
                  uiSchema={questionSchema.uiSchema}
                  onSubmit={submitStudentSolution}/>);

};

export default Assessment;