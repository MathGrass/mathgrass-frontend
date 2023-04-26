import React from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../state/common/hooks';
import {TaskDTO} from '../../src-gen/mathgrass-api';
import {fetchHint} from '../../state/requestThunks';

const IncrementalHints = () => {
    const dispatch = useDispatch();
    const currentHintLevel: number = useAppSelector((state) => state.applicationStateManagement.hintLevel);
    const currentTask: TaskDTO | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const feedbackHistory: string[] = useAppSelector((state) => state.applicationStateManagement.feedbackHistory);

    return (<div>
            <button className="btn btn-info" onClick={() => {
                if (currentTask !== null) {
                    dispatch(fetchHint({
                        hintLevel: currentHintLevel, taskId: currentTask?.id
                    }));
                }
            }}>Request Hint
            </button>
            {feedbackHistory.length !== 0 ? <div>{feedbackHistory[feedbackHistory.length-1]}</div> : null}
            {/*// implement e.g. a carousel with the hint history*/}
        </div>);
};


export default IncrementalHints;
