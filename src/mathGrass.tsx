import React, {useEffect} from 'react';
import GraphEditor from './components/graphEditor/graphEditor';
import Assessment from './components/assessment/assessment';
import IncrementalHints from './components/incrementalHints/incrementalHints';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskManagement from './components/taskManagement/taskManagement';
import {JsonFormTuple, setupApplication} from './state/applicationState';
import {useAppSelector} from './state/common/hooks';
import {useDispatch} from 'react-redux';

const MathGrass = () => {

    const questionSchema: JsonFormTuple | undefined = useAppSelector((state) => state.applicationStateManagement.jsonFormDescription);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setupApplication());
    }, []);


    return (
            /*main container*/
            <div className="container-fluid m-2">
                {/*main row containing graph and sidebar*/}
                <div className="row">
                    {/*graph*/}
                    <div className="col-md-9 mb-1">
                        <div className="card">
                            <div className="card-header">
                                <h2>Graph</h2>
                            </div>
                            <div className="card-body">
                                <GraphEditor/>
                            </div>
                        </div>
                    </div>
                    {/*container for sidebar menu*/}
                    <div className="col-md-3 mb-1">
                        <div className="col-md-12 mb-1">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Tasks</h2>
                                </div>
                                <div className="card-body">
                                    <TaskManagement/>
                                </div>
                            </div>
                        </div>
                        {questionSchema ? renderAssessmentAndHints() : null}
                    </div>
                </div>
            </div>

        );
};

function renderAssessmentAndHints() {
    return <>
        <div className="col-md-12 mb-1">
            <div className="card">
                <div className="card-header">
                    <h2>Assessment</h2>
                </div>
                <div className="card-body">
                    <Assessment/>
                </div>
            </div>
        </div>
        <div className="col-md-12 mb-1">
            <div className="card">
                <div className="card-header">
                    <h2>Hints</h2>
                </div>
                <div className="card-body">
                    <IncrementalHints/>
                </div>
            </div>
        </div>
    </>;
}

export default MathGrass;


