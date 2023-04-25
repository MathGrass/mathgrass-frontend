import React, {useEffect} from 'react';
import Form from '@rjsf/core';
import {useAppSelector} from '../../state/common/hooks';
import { JsonFormTuple, propagateCurrentAnswer, propagateCurrentAssessmentResponse } from '../../state/applicationState';
import {useDispatch} from 'react-redux';
import {WebsocketService} from "../../websockets/websocketService";
import {QuestionDTO, TaskDTO} from '../../src-gen/mathgrass-api';

// websocket channel to receive result of assessment
const getWebsocketChannelForAssessmentResult = (taskId: number) => `/topic/assessmentResult/${taskId}`;
// websocket channel to receive task result id
const getWebsocketChannelForTaskResultId = (taskResultId: number) => `/topic/taskResultId/${taskResultId}`;

const Assessment = () => {
    const dispatch = useDispatch();
    const currentTask: TaskDTO | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const currentAnswer: string | undefined = useAppSelector((state) => state.applicationStateManagement.currentAnswer);
    const currentAssessmentResponse: boolean | null = useAppSelector((state) => state.applicationStateManagement.currentAssessmentResponse);
    const currentlyWaitingForEvaluation: boolean = useAppSelector((state) => state.applicationStateManagement.showWaitingForEvaluation);

    const question: QuestionDTO | null | undefined = currentTask?.question;

    const questionSchema: JsonFormTuple | null = transformQuestionToSchema(question);

    // initialize websocket connection to backend
    const websocketService = new WebsocketService();
    websocketService.connect();

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
                    <div className="alert alert-success" role="alert">Your assessment is correct</div> :
                    <div className="alert alert-danger" role="alert">Your assessment is wrong</div>}
            </div>;
        }
    }

    function showWaitingForEvaluationNotice() {
        return  <div className="spinner-border m-2" role="status"/>;
    }

    // subscribe to websocket channel to receive assessment result
    function subscribeToAssessmentResponse(taskResultId: number) {
        // subscribe to websocket channel for current task
        websocketService.subscribe(getWebsocketChannelForAssessmentResult(taskResultId));

        // handle incoming messages
        websocketService.receive(getWebsocketChannelForAssessmentResult(taskResultId))
            .subscribe((result: boolean) => {
                // update current state
                dispatch(propagateCurrentAssessmentResponse(result));
                // unsubscribe this subscription again
                websocketService.unsubscribe(getWebsocketChannelForAssessmentResult(taskResultId));
            })
    }

    // subscribe to websocket channel to receive task result id
    function subscribeToTaskResultId(taskResultId: number) {
        // subscribe to websocket channel for task result id
        websocketService.subscribe(getWebsocketChannelForTaskResultId(taskResultId));

        // handle incoming messages
        websocketService.receive(getWebsocketChannelForTaskResultId(taskResultId))
            .subscribe((result: number) => {
                // subscribe to websocket channel for task result id
                subscribeToAssessmentResponse(result);
                // unsubscribe again
                websocketService.unsubscribe(getWebsocketChannelForTaskResultId(taskResultId));
            })
    }

    // unmount component
    useEffect(() => {
        return () => {
            // close websocket connection
            websocketService.onDestroy();
            console.log('Assessment component unmounted');
        };
    }, []);

    return (<div>
        <Form schema={questionSchema.schema}
              uiSchema={questionSchema.uiSchema}
              onSubmit={(e) => {
                  const submittedAnswer: string = e.formData as string;
                  if (currentTask && currentTask.question) {
                      // create listener for backend response
                      subscribeToTaskResultId(currentTask.id);
                      // send assessment to backend
                      websocketService.send("/app/fetchAssessment",
                          {taskId: currentTask.id, answer: submittedAnswer});
                      dispatch(propagateCurrentAnswer(submittedAnswer));
                  }
              }
              }>
            <button type="submit" className="btn btn-info" data-testid="submitAnswerButton">Submit</button>
        </Form>

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