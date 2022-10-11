import React from 'react';
import Form from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';
import {fetchAssessment, JsonFormTuple, Question} from '../../state/applicationState';
import {useDispatch} from 'react-redux';


const Assessment = () => {
    const dispatch = useDispatch();

    const questions: Question[] | null | undefined = useAppSelector((state) => state.applicationStateManagement.currentTask?.questions);

    const questionSchema: JsonFormTuple | null = transformQuestionsToSchema(questions);

    if(questionSchema === null){
        return <div />;
    }

    return (<div>
        <Form schema={questionSchema.schema}
              uiSchema={questionSchema.uiSchema}
              onSubmit={() =>
                  dispatch(fetchAssessment())}/>
    </div>);

};


function transformQuestionsToSchema(questions: Question[] | null | undefined ): JsonFormTuple | null {
    if(questions === null || questions === undefined){
        return null;
    }

    let questionIndex: number = 0;
    const questionMap: Map<string, Question> = new Map();
    questions.forEach((q: Question) => {
        questionMap.set(questionIndex.toString(), q);
        questionIndex++;
    });

    const requiredQuestions: string[] = Array.from(questionMap.keys());

    return {
        schema: {
            title: 'Graph assessment',
            type: 'object',
            required: requiredQuestions,
            properties: {
                isX: {type: 'boolean', title: 'Does the graph have property X?'},
                isY: {type: 'number', title: 'How many XYZ?'},
                isZ: {type: 'string', title: 'Freetext question?'}
            }
        },
        uiSchema: {
            isX: {
                'ui:widget': 'radio'
            }
        }
    };
}

export default Assessment;