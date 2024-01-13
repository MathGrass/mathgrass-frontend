import React from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../state/common/hooks';
import {TaskDTO} from '../../src-gen/mathgrass-api';
import {fetchHint} from '../../state/requestThunks';
import HintHistorySlider from './hintHistorySlider';

const IncrementalHints = () => {
    const dispatch = useDispatch();
    const currentHintLevel: number = useAppSelector((state) => state.applicationStateManagement.hintLevel);
    const currentTask: TaskDTO | null = useAppSelector((state) => state.applicationStateManagement.currentTask);
    const hintHistory: string[] = useAppSelector((state) => state.applicationStateManagement.hintHistory);

    return (<div>
            <button type="button" className="btn btn-primary" onClick={() => {
                if (currentTask !== null) {
                    dispatch(fetchHint({
                        hintLevel: currentHintLevel, taskId: currentTask?.id
                    }));
                }
            }}>Request Hint
            </button>
            {hintHistory.length !== 0 ? <HintHistorySlider/> : null}
            {/*// implement e.g. a carousel with the hint history*/}
        </div>);
};


export default IncrementalHints;
