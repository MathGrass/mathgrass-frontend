import React, {useEffect} from 'react';
import * as joint from 'jointjs';
import {useAppSelector} from '../../state/common/hooks';
import {generateDemoGraph} from '../../state/initialResources/demoGraph';
import {useDispatch} from 'react-redux';
import {propagateGraphState} from '../../state/applicationState';
import GraphFeedback from './graphFeedback';

const GRAPH_CONTAINER_ID = 'mathGrassEditor';

const EDITOR_WIDTH_SCALING_FACTOR = 0.95;

const GraphEditor = () => {
    const graphPayload = useAppSelector((state) => state.applicationStateManagement.graphUneditedOriginal);
    const dispatch = useDispatch();

    let graphEditorModel: joint.dia.Graph;
    if (graphPayload === undefined) {
        graphEditorModel = generateDemoGraph();
    } else {
        graphEditorModel = new joint.dia.Graph({}, {cellNamespace: joint.shapes}).fromJSON(graphPayload);
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
                <GraphFeedback/>
            </div>);
};

export default GraphEditor;
