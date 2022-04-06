import React, {useEffect} from 'react';
import * as joint from 'jointjs';
import {useAppSelector} from "../../state/common/hooks";
import {generateDemoGraph} from "../../state/initialResources/demoGraph";

const GRAPH_CONTAINER_ID = 'mathGrassEditor';

const EDITOR_WIDTH_SCALING_FACTOR = 0.95;



const GraphEditor = () => {
    const graphPayload = useAppSelector((state) => state.taskManagement.graphPayload);

    let graphEditorModel : joint.dia.Graph;
    if(graphPayload == undefined){
        graphEditorModel = generateDemoGraph();
    }else{
        graphEditorModel = new joint.dia.Graph({}, {cellNamespace: joint.shapes}).fromJSON(graphPayload);
    }

    useEffect(() => {
        const domContainer = document.getElementById(GRAPH_CONTAINER_ID);

        console.log("i just redrew");

        const paper : joint.dia.Paper = new joint.dia.Paper({
            el: domContainer!,
            model: graphEditorModel,
            width: EDITOR_WIDTH_SCALING_FACTOR * domContainer!.offsetWidth,
            height: 500,
            gridSize: 1,
            cellViewNamespace: joint.shapes,
            restrictTranslate: true
        });


    });


    return (<div id={GRAPH_CONTAINER_ID}>Graph</div>);
};

export default GraphEditor;
