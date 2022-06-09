import React from 'react';
import {JSONSchema7} from 'json-schema';
import Form from '@rjsf/core';
import {useDispatch} from 'react-redux';
import {requestHint} from '../../state/applicationState';
import {useAppSelector} from '../../state/common/hooks';
import {generateAndDownloadFile} from '../../util/fileDownloadUtils';

const IncrementalHints = () => {
    const dispatch = useDispatch();
    const currentHintLevel = useAppSelector((state) => state.applicationStateManagement.hintLevel);
    const currentHintFeedback = useAppSelector((state) => state.applicationStateManagement.currentHintFeedback);
    const hintFeedbackHistory = useAppSelector((state) => state.applicationStateManagement.feedbackHistory);


    return (
        <div>
            <button className="btn btn-info" onClick={(event) => dispatch(requestHint(null))}>Request Hint.</button>
            { currentHintFeedback ? <div>{currentHintFeedback}</div> : null}
            {/*// implement e.g. a carousel with the hint history*/}
        </div>
    );
};


export default IncrementalHints;
