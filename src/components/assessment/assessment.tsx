import React from 'react';
import Form from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';
import { fetchAssessment, JsonFormTuple, propagateCurrentAnswer } from '../../state/applicationState';
import {useDispatch} from 'react-redux';
import {QuestionDTO, TaskDTO} from '../../src-gen/mathgrass-api';


const Assessment = () => {
    const dispatch = useDispatch();
    const currentTask: TaskDTO | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const currentAnswer: string | undefined = useAppSelector((state) => state.applicationStateManagement.currentAnswer);
    const currentAssessmentResponse: boolean | null = useAppSelector((state) => state.applicationStateManagement.currentAssessmentResponse);
    const currentlyWaitingForEvaluation: boolean = useAppSelector((state) => state.applicationStateManagement.showWaitingForEvaluation);

    const question: QuestionDTO | null | undefined = currentTask?.question;

    const questionSchema: JsonFormTuple | null = transformQuestionToSchema(question);

    if (questionSchema === null) {
        return <div/>;
    }

    function renderCurrentAssessment() {
        if (typeof currentAssessmentResponse === 'boolean') {
            return <div><br/>
                <div className="alert alert-secondary" role="alert">
                    You submitted the following answer: '{currentAnswer}'
                </div>
                {currentAssessmentResponse ?
                    <div className="alert alert-success" role="alert">Your assessment is correct.</div> :
                    <div className="alert alert-danger" role="alert">Your assessment is wrong</div>}
            </div>;
        }
    }

    function showWaitingForEvaluationNotice() {
        return  <div className="spinner-border m-2" role="status"/>;
    }

    return (<div>
        <Form schema={questionSchema.schema}
              uiSchema={questionSchema.uiSchema}
              onSubmit={(e) => {
                  const submittedAnswer: string = e.formData as string;
                  if (currentTask && currentTask.question) {
                      dispatch(fetchAssessment({
                          taskId: currentTask.id,
                          answer: submittedAnswer
                      }));
                      dispatch(propagateCurrentAnswer(submittedAnswer));
                  }
              }
              }/>

        {currentlyWaitingForEvaluation ? showWaitingForEvaluationNotice() : renderCurrentAssessment()}
    </div>);
};


function transformQuestionToSchema(question: QuestionDTO | null | undefined): JsonFormTuple | null {
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