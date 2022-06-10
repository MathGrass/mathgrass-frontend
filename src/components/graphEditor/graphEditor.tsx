import React, {useEffect} from 'react';
import * as joint from 'jointjs';
import {useAppSelector} from '../../state/common/hooks';
import {generateDemoGraph} from '../../state/initialResources/demoGraph';
import {useDispatch} from 'react-redux';
import {propagateGraphState, requestHint, requestNewGraph} from '../../state/applicationState';
import GraphFeedback from './graphFeedback';
import {generateAndDownloadFile} from '../../util/fileDownloadUtils';

const GRAPH_CONTAINER_ID = 'mathGrassEditor';

const EDITOR_WIDTH_SCALING_FACTOR = 0.95;

const GraphEditor = () => {
    const currentTaskType = useAppSelector((state) => state.applicationStateManagement.taskType);
    const graphUneditedOriginal = useAppSelector((state) => state.applicationStateManagement.graphUneditedOriginal);
    const showAssessmentFeedback: boolean = useAppSelector((state) => state.applicationStateManagement.showFeedbackSection);

    const dispatch = useDispatch();

    let graphEditorModel: joint.dia.Graph;
    if (graphUneditedOriginal === undefined) {
        graphEditorModel = generateDemoGraph();
    } else {
        graphEditorModel = new joint.dia.Graph({}, {cellNamespace: joint.shapes}).fromJSON(graphUneditedOriginal);
    }

    // dispatch new state on edit
    // TODO - which events should trigger this? as of now, state propagation is excessive
    graphEditorModel.on('all', (eventName, cell) => {
        dispatch(propagateGraphState(graphEditorModel.toJSON()));
    });


    useEffect(() => {
        const domContainer = document.getElementById(GRAPH_CONTAINER_ID);

        const paper: joint.dia.Paper = new joint.dia.Paper({
                el: domContainer!,
                model: graphEditorModel,
                width: EDITOR_WIDTH_SCALING_FACTOR * domContainer!.offsetWidth,
                height: 500,
                gridSize: 1,
                cellViewNamespace: joint.shapes,
                restrictTranslate: true
            }
        );

        // TODO - dynamic resize
        window.addEventListener('resize', () => {
            // handle resize event
        }, true);

    });

    const outerStyle = {
        overflow: 'auto'
    };

    return (<div id="outer" style={outerStyle}>
        <div id={GRAPH_CONTAINER_ID}>Graph</div>
        {showAssessmentFeedback ? <GraphFeedback/> : null}
        <div>
            <div className="d-flex h-100">
                <div className="align-self-start mr-auto">
                    <button className="btn btn-danger" onClick={(event) => dispatch(requestNewGraph(currentTaskType))}>Request a new graph for the same task type</button>
                </div>
                <div className="align-self-center mx-auto">
                    {}
                </div>
                <div className="align-self-end ml-auto">
                    <button className="btn btn-info" onClick={(event) => generateAndDownloadFile(JSON.stringify(graphEditorModel), 'MathGrass-graph.json')}>Export the current graph</button>
                </div>
            </div>
        </div>
    </div>);
};

export default GraphEditor;
