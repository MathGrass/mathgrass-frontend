import React from 'react';
import Form from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';
import {JsonFormTuple, requestAssessment} from '../../state/applicationState';
import {useDispatch} from 'react-redux';



const Assessment = () => {
    const dispatch = useDispatch();

    const questionSchema: JsonFormTuple | undefined = useAppSelector((state) => state.applicationStateManagement.jsonFormDescription);

    if(questionSchema === undefined){
        return <div />;
    }

    return (<div>
        <Form schema={questionSchema.schema}
              uiSchema={questionSchema.uiSchema}
              onSubmit={(form) =>
                  dispatch(requestAssessment(form))}/>
    </div>);

};

export default Assessment;