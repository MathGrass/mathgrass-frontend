import React from 'react';
import {useAppSelector} from '../../state/common/hooks';

export const GraphFeedback = () => {
    const assessmentFeedback = useAppSelector((state) => state.applicationStateManagement.assessmentFeedback);

    return (
        <div>
            <div>
                {assessmentFeedback}
            </div>
        </div>
        );

};

export default GraphFeedback;