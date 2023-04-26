import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../state/common/hooks';

import {fetchTaskById} from '../../state/asyncThunks';

const TaskManagement = () => {
    const availableTasks = useAppSelector((state) => state.applicationStateManagement.availableTasks);

    const dispatch = useAppDispatch();
    const NO_VALID_TASK_ID = -1;
    const initialTaskIdSelection: number = availableTasks.length > 0 ? availableTasks[0].id : NO_VALID_TASK_ID;
    const [selectedTaskId, setSelectedTaskId] = useState(initialTaskIdSelection);


    const selectTaskIdsWithOptionsElements = <select className="form-control"
                                                     onChange={(s) => setSelectedTaskId(+s.target.value)}>
        <option disabled selected>Select a Task</option>
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
                    if (isNaN(selectedTaskId) || selectedTaskId === NO_VALID_TASK_ID) {
                        return;
                    } else {
                        dispatch(fetchTaskById(selectedTaskId));
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