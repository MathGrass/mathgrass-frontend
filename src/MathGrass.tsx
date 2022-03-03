import React from 'react';
import GraphEditor from "./components/GraphEditor/GraphEditor";
import Assessment from "./components/Assessment/Assessment";
import IncrementalHints from "./components/IncrementalHints/IncrementalHints";
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskManagement from "./components/TaskManagement/TaskManagement";

export type MathGrassProps = {
    assessmentServerUrl : string
}

class MathGrass extends React.Component<MathGrassProps> {
    render() {
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
                                <GraphEditor />
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
                                    <TaskManagement />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-1">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Assessment</h2>
                                </div>
                                <div className="card-body">
                                    <Assessment {...this.props}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-1">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Hints</h2>
                                </div>
                                <div className="card-body">
                                    <IncrementalHints />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        );
    }
}

export default MathGrass;


