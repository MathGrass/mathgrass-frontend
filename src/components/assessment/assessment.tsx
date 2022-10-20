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
import {JSONSchema7} from 'json-schema';


const Assessment = () => {
    const dispatch = useDispatch();
    const currentTask: Task | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const question: Question | null | undefined = currentTask?.question;

    const questionSchema: JsonFormTuple | null = transformQuestionsToSchema(question);

    if (questionSchema === null) {
        return <div/>;
    }

    return (<div>
        <Form schema={questionSchema.schema}
              uiSchema={questionSchema.uiSchema}
              onSubmit={() => {
                  if (currentTask && currentTask.question) {
                      if(currentTask.question.isDynamicQuestion){
                          dispatch(fetchDynamicAssessment({
                              taskId: currentTask.taskId,
                              answer: 'answer'
                          }));
                      }else{
                          dispatch(fetchStaticAssessment({
                              taskId: currentTask.taskId,
                              answer: 'answer'
                          }));
                      }
                  }
              }
              }/>
    </div>);

};


function transformQuestionsToSchema(question: Question | null | undefined): JsonFormTuple | null {
    if (question === null || question === undefined) {
        return null;
    }

    let questionIndex: number = 0;
    const questionMap: Map<string, Question> = new Map();
    questionMap.set(questionIndex.toString(), question);
    questionIndex++;

    const questionObject: any = {};

    questionMap.forEach((value, key) => {
            questionObject[key] = {
                type: 'string',
                title: value.question
            } as JSONSchema7;
        }
    );

    return {
        schema: {
            title: 'Graph assessment',
            type: 'object',
            properties: questionObject
        },
        uiSchema: {}
    };
}

export default Assessment;