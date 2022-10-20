import React from 'react';
import Form from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';
import {
    fetchDynamicAssessment,
    fetchStaticAssessment,
    JsonFormTuple,
    Question,
    Task
} from '../../state/applicationState';
import {useDispatch} from 'react-redux';




const Assessment = () => {
    const dispatch = useDispatch();
    const currentTask: Task | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const currentAssessmentResponse: boolean | null = useAppSelector((state) => state.applicationStateManagement.currentAssessmentResponse);

    const question: Question | null | undefined = currentTask?.question;

    const questionSchema: JsonFormTuple | null = transformQuestionToSchema(question);

    if (questionSchema === null) {
        return <div/>;
    }

    function showCurrentAssessment() {
        if(typeof  currentAssessmentResponse === 'boolean'){
            return  <div>
                {currentAssessmentResponse ? 'Your assessment is correct.' : 'Your assessment is wrong'}
            </div>;
        }
    }

    return (<div>
        <Form schema={questionSchema.schema}
              uiSchema={questionSchema.uiSchema}
              onSubmit={(e) => {
                  const submittedAnswer: string = e.formData as string;
                  if (currentTask && currentTask.question) {
                      if (currentTask.question.isDynamicQuestion) {
                          dispatch(fetchDynamicAssessment({
                              taskId: currentTask.taskId,
                              answer: submittedAnswer
                          }));
                      } else {
                          dispatch(fetchStaticAssessment({
                              taskId: currentTask.taskId,
                              answer: submittedAnswer
                          }));
                      }
                  }
              }
              }/>
        { currentAssessmentResponse !== null ? showCurrentAssessment() : null}
    </div>);
};



function transformQuestionToSchema(question: Question | null | undefined): JsonFormTuple | null {
    if (question === null || question === undefined) {
        return null;
    }

    return {
        schema: {
            title: question.question,
            type: 'string'
        },
        uiSchema: {}
    };
}

export default Assessment;