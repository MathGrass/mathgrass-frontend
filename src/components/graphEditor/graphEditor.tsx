import React, {useEffect} from 'react';
import * as joint from 'jointjs';

type GraphEditorProps = {};

export type GraphEditorState = {
    currentGraph: joint.dia.Graph
};

const GRAPH_CONTAINER_ID = 'mathGrassEditor';

const EDITOR_WIDTH_SCALING_FACTOR = 0.95;

export function generateEmptyGraph() {
    const namespace = joint.shapes;
    const graph = new joint.dia.Graph({}, {cellNamespace: namespace});
    return graph;
}

const GraphEditor = () => {
    const graph = generateEmptyGraph();

    useEffect(() => {
        const domContainer = document.getElementById(GRAPH_CONTAINER_ID);

        const paper : joint.dia.Paper = new joint.dia.Paper({
            el: domContainer!,
            model: graph,
            width: EDITOR_WIDTH_SCALING_FACTOR * domContainer!.offsetWidth,
            height: 500,
            gridSize: 1,
            cellViewNamespace: joint.shapes,
            restrictTranslate: true
        });

        const circle = new joint.shapes.standard.Circle();
        circle.position(100, 30);
        circle.resize(40, 40);
        circle.attr({
            body: {},
            label: {
                text: '1',
            }
        });
        circle.addTo(graph);

        const circle2 = circle.clone();
        circle2.translate(300, 0);
        circle2.attr('label/text', '2');
        circle2.addTo(graph);

        const link = new joint.shapes.standard.Link();
        link.source(circle);
        link.target(circle2);
        link.addTo(graph);
    });

    return (<div id={GRAPH_CONTAINER_ID}>Graph</div>);
};

export default GraphEditor;
