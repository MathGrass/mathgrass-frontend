import React from 'react';
import Form, {ISubmitEvent, UiSchema} from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';
import {JsonFormTuple} from '../../state/applicationState';

function submitStudentSolution(form: ISubmitEvent<any>): void {
    //
}



const Assessment = () => {
    const questionSchema: JsonFormTuple = useAppSelector((state) => state.applicationStateManagement.jsonFormDescription);

    return (<Form schema={questionSchema.schema}
                  uiSchema={questionSchema.uiSchema}
                  onSubmit={submitStudentSolution}/>);

};

export default Assessment;