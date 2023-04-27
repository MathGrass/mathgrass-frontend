import React, {useRef} from 'react';
import {useAppSelector} from '../../state/common/hooks';
import {propagateCurrentAnswer} from '../../state/applicationState';
import {useDispatch} from 'react-redux';
import {TaskDTO} from '../../src-gen/mathgrass-api';
import {fetchAssessment} from '../../state/requestThunks';


const Assessment = () => {
    const dispatch = useDispatch();
    const currentTask: TaskDTO | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const currentAnswer: string | undefined = useAppSelector((state) => state.applicationStateManagement.currentAnswer);
    const currentAssessmentResponse: boolean | null = useAppSelector((state) => state.applicationStateManagement.currentAssessmentResponse);
    const currentlyWaitingForEvaluation: boolean = useAppSelector((state) => state.applicationStateManagement.showWaitingForEvaluation);
    const question: string | undefined = currentTask?.question.question;

    // reference to the input field with the user answer
    const inputRef = useRef<HTMLInputElement>(null);

    function renderCurrentAssessment() {
        if (typeof currentAssessmentResponse === 'boolean') {
            // clear input field
            inputRef.current!.value = '';

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
        return <div className="spinner-border m-2" role="status"/>;
    }

    const userAnswerInputField = <input type="text" className="form-control" id="userAnswerInputField"
                                        placeholder="Your answer"
                                        ref={inputRef}/>;

    return (<div>
        <form>
            <div className="form-group">
                {question}
                {userAnswerInputField}
            </div>
            <button type="button" className="btn btn-primary" onClick={() => {
                if (inputRef.current && currentTask) {
                    // fetch the server response
                    dispatch(fetchAssessment({
                        taskId: currentTask.id,
                        answer: inputRef.current.value
                    }));
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