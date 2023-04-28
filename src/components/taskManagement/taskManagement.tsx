import React, {useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';

import {fetchTaskById} from '../../state/requestThunks';

const TaskManagement = () => {
    const availableTasks = useAppSelector((state) => state.applicationStateManagement.availableTasks);

    const dispatch = useAppDispatch();
    const taskIdRef = useRef<HTMLSelectElement>(null);
    const INVALID_TASK_ID = -1;
    const selectTaskIdsWithOptionsElements = <select className="form-control" ref={taskIdRef} defaultValue={INVALID_TASK_ID}>
        <option disabled value={INVALID_TASK_ID}>Select a Task</option>
        {
            availableTasks.map((taskIdLabelTuple) => <option key={taskIdLabelTuple.id}
                                                             value={taskIdLabelTuple.id}>{taskIdLabelTuple.label}</option>)
        }
    </select>;

    function renderTaskSelectionForm() {
        return <div>
            <form>
                <div className="form-group">
                    {selectTaskIdsWithOptionsElements}
                </div>
                <button type="button" className="btn btn-primary" onClick={() => {
                    if (taskIdRef.current && +taskIdRef.current.value !== INVALID_TASK_ID) {
                        dispatch(fetchTaskById(+taskIdRef.current.value));
                    }
                }
                }>Submit
                </button>
            </form>
        </div>;
    }

    return (
        <>
            {availableTasks.length !== 0 ? renderTaskSelectionForm() : 'Could not fetch any data or parse the response. Please check your internet connections or server settings.'}
        </>
    );
};

export default TaskManagement;