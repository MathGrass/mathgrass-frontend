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
            {hintHistory.map((hint, index) => {
                return (
                    <div key={hint}>
                        {hint}
                        { hintHistory.length !== (index + 1) ? <hr className="dashed"/> : null}
                    </div>);
            })}
        </div>
    );
};

export default HintHistorySlider;