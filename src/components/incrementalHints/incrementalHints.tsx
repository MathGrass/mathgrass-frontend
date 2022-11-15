import React from 'react';
import {useDispatch} from 'react-redux';
import {fetchHint, Task} from '../../state/applicationState';
import {useAppSelector} from '../../state/common/hooks';

const IncrementalHints = () => {
    const dispatch = useDispatch();
    const currentHintLevel: number = useAppSelector((state) => state.applicationStateManagement.hintLevel);
    const currentTask: Task | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const feedbackHistory: string[] = useAppSelector((state) => state.applicationStateManagement.feedbackHistory);

    return (<div>
            <button className="btn btn-info" onClick={() => {
                if (currentTask !== null) {
                    dispatch(fetchHint({
                        hintLevel: currentHintLevel, taskId: currentTask?.taskId
                    }));
                }
            }}>Request Hint
            </button>
            {feedbackHistory.length !== 0 ? <div>{feedbackHistory[feedbackHistory.length-1]}</div> : null}
            {/*// implement e.g. a carousel with the hint history*/}
        </div>);
};


export default IncrementalHints;
