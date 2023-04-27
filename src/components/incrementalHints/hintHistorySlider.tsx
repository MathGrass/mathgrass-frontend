import React from 'react';
import {useAppSelector} from '../../state/common/hooks';

const HintHistorySlider = () => {
    const hintHistory: string[] = useAppSelector((state) => state.applicationStateManagement.hintHistory);

    if(hintHistory.length === 0) {
        return null;
    }

    if(hintHistory.length === 1) {
        return <div>{hintHistory[0]}</div>;
    }

    return (
        <div>
            {hintHistory.map((hint) => {
                return <div key={hint}>{hint}</div>;
            })}
        </div>
    );
};

export default HintHistorySlider;