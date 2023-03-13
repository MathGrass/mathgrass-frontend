import React from 'react';
import Form from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';
import {
    JsonFormTuple,
    propagateCurrentAnswer,
    propagateCurrentAssessmentResponse,
} from '../../state/applicationState';
import {useDispatch} from 'react-redux';
import {WebsocketService} from "../../websockets/websocketService";
import {Question, Task} from '../../src-gen/mathgrass-api';


const getWebsocketChannel = (taskId: number) => `/topic/assessmentResult/${taskId}`;

const Assessment = () => {
    const dispatch = useDispatch();
    const currentTask: Task | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const currentAnswer: string | undefined = useAppSelector((state) => state.applicationStateManagement.currentAnswer);
    const currentAssessmentResponse: boolean | null = useAppSelector((state) => state.applicationStateManagement.currentAssessmentResponse);

    const question: Question | null | undefined = currentTask?.question;

    const questionSchema: JsonFormTuple | null = transformQuestionToSchema(question);

    // initialize websocket connection to backend
    const websocketService = new WebsocketService();
    websocketService.connect();

    if (questionSchema === null) {
        return <div/>;
    }

    function showCurrentAssessment() {
        if (typeof currentAssessmentResponse === 'boolean'){
            return  <div><br/>
                    <div className="alert alert-secondary" role="alert">
                        You submitted the following answer: '{currentAnswer}'
                    </div>
                {currentAssessmentResponse ?
                    <div className="alert alert-success" role="alert">Your assessment is correct</div> :
                    <div className="alert alert-danger" role="alert">Your assessment is wrong</div>}
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
                          websocketService.subscribe(getWebsocketChannel(currentTask.id))
                          websocketService.receive(getWebsocketChannel(currentTask.id))
                              .subscribe((result: boolean) => {
                                      dispatch(propagateCurrentAssessmentResponse(result));
                                      websocketService.unsubscribe(getWebsocketChannel(currentTask.id));
                                  }
                              )
                          websocketService.send("/app/evaluateDynamicAssessment",
                              {taskId: currentTask.id, answer: submittedAnswer})
                      } else {
                          console.log("Subscribing to channel " + getWebsocketChannel(currentTask.id))
                          websocketService.subscribe(getWebsocketChannel(currentTask.id))
                          websocketService.receive((getWebsocketChannel(currentTask.id))).subscribe((result) => {
                              dispatch(propagateCurrentAssessmentResponse(result));
                              websocketService.unsubscribe(getWebsocketChannel(currentTask.id));
                          })
                          websocketService.send("/app/evaluateStaticAssessment",
                              {taskId: currentTask.id, answer: submittedAnswer})
                      }
                      dispatch(propagateCurrentAnswer(submittedAnswer));
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