import React from 'react';
import Form, {ISubmitEvent, UiSchema} from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';
import {JsonFormTuple, propagateGraphState, requestAssessment} from '../../state/applicationState';
import {useDispatch} from 'react-redux';



const Assessment = () => {
    const dispatch = useDispatch();

    const questionSchema: JsonFormTuple = useAppSelector((state) => state.applicationStateManagement.jsonFormDescription);

    return (<div>
        <Form schema={questionSchema.schema}
              uiSchema={questionSchema.uiSchema}
              onSubmit={(form) =>
                  dispatch(requestAssessment(form))}/>
    </div>);

};

export default Assessment;