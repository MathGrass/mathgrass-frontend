import React from 'react';
import {useDispatch} from 'react-redux';
import {fetchHint, requestHint, Task} from '../../state/applicationState';
import {useAppSelector} from '../../state/common/hooks';

const IncrementalHints = () => {
    const dispatch = useDispatch();
    const currentHintLevel: number = useAppSelector((state) => state.applicationStateManagement.hintLevel);
    const currentHintFeedback = useAppSelector((state) => state.applicationStateManagement.currentHintFeedback);
    const currentTask: Task | null = useAppSelector((state) => state.applicationStateManagement.currentTask);



    return (
        <div>
            <button className="btn btn-info" onClick={() => dispatch(fetchHint({
                hintLevel: currentHintLevel,
                taskId: 0
            }))}>Request Hint</button>
            { currentHintFeedback ? <div>{currentHintFeedback}</div> : null}
            {/*// implement e.g. a carousel with the hint history*/}
        </div>
    );
};


export default IncrementalHints;
