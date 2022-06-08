import React from 'react';
import Form, {ISubmitEvent, UiSchema} from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';

function submitStudentSolution(form: ISubmitEvent<any>): void {
    //
}



const Assessment = () => {
    const questionSchema = useAppSelector((state) => state.taskManagement.questionSchema);

    return (<Form schema={questionSchema.assessmentSchema}
                  uiSchema={questionSchema.assessmentUiSchema}
                  onSubmit={submitStudentSolution}/>);

};

export default Assessment;