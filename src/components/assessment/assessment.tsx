import React, {useEffect, useRef} from 'react';
import {useAppSelector} from '../../state/common/hooks';
import { propagateCurrentAnswer, propagateCurrentAssessmentResponse } from '../../state/applicationState';
import {useDispatch} from 'react-redux';
import websocketService from "../../websockets/websocketService";
import {TaskDTO} from '../../src-gen/mathgrass-api';

// websocket channel to receive result of assessment
export const getWebsocketChannelForAssessmentResult = (taskResultId: number) => `/topic/assessmentResult/${taskResultId}`;
// websocket channel to receive task result id
export const getWebsocketChannelForTaskResultId = (taskId: number) => `/topic/taskResultId/${taskId}`;

const Assessment = () => {
    const dispatch = useDispatch();
    const currentTask: TaskDTO | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const currentAnswer: string | undefined = useAppSelector((state) => state.applicationStateManagement.currentAnswer);
    const currentAssessmentResponse: boolean | null = useAppSelector((state) => state.applicationStateManagement.currentAssessmentResponse);
    const currentlyWaitingForEvaluation: boolean = useAppSelector((state) => state.applicationStateManagement.showWaitingForEvaluation);
    const question: string | undefined = currentTask?.question.question;

    // reference to the input field with the user answer
    const inputRef = useRef<HTMLInputElement>(null);

    // initialize websocket connection to backend
    websocketService.connect();

    function renderCurrentAssessment() {
        if (typeof currentAssessmentResponse === 'boolean') {
            // clear input field
            inputRef.current!.value = '';

            return <div><br/>
                <div className="alert alert-secondary" role="alert">
                    You submitted the following answer: '{currentAnswer}'
                </div>
                {currentAssessmentResponse ?
                    <div className="alert alert-success" role="alert">Your answer is correct!</div> :
                    <div className="alert alert-danger" role="alert">Your answer is wrong!</div>}
            </div>;
        }
    }

    function showWaitingForEvaluationNotice() {
        return <div className="spinner-border m-2" role="status"/>;
    }

    const userAnswerInputField = <input type="text" className="form-control" id="userAnswerInputField"
                                        placeholder="Your answer"
                                        ref={inputRef}/>;

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
    function subscribeToTaskResultId(taskId: number) {
        // subscribe to websocket channel for task result id
        websocketService.subscribe(getWebsocketChannelForTaskResultId(taskId));

        // handle incoming messages
        websocketService.receive(getWebsocketChannelForTaskResultId(taskId))
            .subscribe((result: number) => {
                // subscribe to websocket channel for task result id
                subscribeToAssessmentResponse(result);
                // unsubscribe again
                websocketService.unsubscribe(getWebsocketChannelForTaskResultId(taskId));
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
        <form>
            <div className="form-group">
                {question}
                {userAnswerInputField}
            </div>
            <button type="button" className="btn btn-primary" data-testid="submitAnswerButton" onClick={() => {
                if (inputRef.current && currentTask) {
                    // create listener for backend response
                    subscribeToTaskResultId(currentTask.id);
                    // send assessment to backend
                    websocketService.send("/app/fetchAssessment",
                        {taskId: currentTask.id, answer: inputRef.current.value});
                    // propagate the current answer to the other components to notify them
                    // that we are waiting for the result
                    dispatch(propagateCurrentAnswer(inputRef.current.value));
                }
            }
            }>Submit
            </button>
        </form>
        {currentlyWaitingForEvaluation ? showWaitingForEvaluationNotice() : renderCurrentAssessment()}
    </div>);
};


export default Assessment;