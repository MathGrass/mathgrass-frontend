import React, {useEffect} from 'react';
import * as joint from 'jointjs';
import {useAppSelector} from '../../state/common/hooks';
import {generateDemoGraph} from '../../state/initialResources/demoGraph';
import {useDispatch} from 'react-redux';
import {exportGraph} from '../../state/graphSlice';

const GRAPH_CONTAINER_ID = 'mathGrassEditor';

const EDITOR_WIDTH_SCALING_FACTOR = 0.95;

const GraphEditor = () => {
    const graphPayload = useAppSelector((state) => state.taskManagement.graphPayload);
    const dispatch = useDispatch();

    let graphEditorModel: joint.dia.Graph;
    if (graphPayload === undefined) {
        graphEditorModel = generateDemoGraph();
    } else {
        graphEditorModel = new joint.dia.Graph({}, {cellNamespace: joint.shapes}).fromJSON(graphPayload);
    }

    // dispatch new state on edit
    graphEditorModel.on('all', (eventName, cell) => {
        dispatch(exportGraph(graphEditorModel.toJSON()));
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
            </div>);
};

export default GraphEditor;
