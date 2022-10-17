import React from 'react';
import Form from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';
import {fetchAssessment, JsonFormTuple, Question, Task} from '../../state/applicationState';
import {useDispatch} from 'react-redux';
import {JSONSchema7} from 'json-schema';


const Assessment = () => {
    const dispatch = useDispatch();
    const currentTask: Task | null  = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const questions: Question[] | null | undefined = currentTask?.questions;

    const questionSchema: JsonFormTuple | null = transformQuestionsToSchema(questions);

    if (questionSchema === null) {
        return <div/>;
    }

    return (<div>
        <Form schema={questionSchema.schema}
              uiSchema={questionSchema.uiSchema}
              onSubmit={() => {
                  if(currentTask) {
                      dispatch(fetchAssessment({
                          taskId: currentTask.taskId,
                          answer: 'answer'
                      }));
                  }
              }
                  }/>
    </div>);

};


function transformQuestionsToSchema(questions: Question[] | null | undefined): JsonFormTuple | null {
    if (questions === null || questions === undefined) {
        return null;
    }

    let questionIndex: number = 0;
    const questionMap: Map<string, Question> = new Map();
    questions.forEach((q: Question) => {
        questionMap.set(questionIndex.toString(), q);
        questionIndex++;
    });

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