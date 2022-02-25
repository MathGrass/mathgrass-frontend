import React from 'react';
import * as joint from 'jointjs'

type GraphEditorProps = {
}

type GraphEditorState = {
    currentGraph: joint.dia.Graph
}

const GRAPH_CONTAINER_ID = 'mathGrassEditor';

class GraphEditor extends React.Component {


    constructor(props: GraphEditorProps, state: GraphEditorState) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        let namespace = joint.shapes;
        let graph = new joint.dia.Graph({}, {cellNamespace: namespace});

        const domContainer = document.getElementById(GRAPH_CONTAINER_ID);

        new joint.dia.Paper({
            // @ts-ignore
            el: domContainer,
            model: graph,
            width: 800,
            height: 500,
            gridSize: 1,
            cellViewNamespace: namespace,
            restrictTranslate: true
        });

        let circle = new joint.shapes.standard.Circle();
        circle.position(100, 30);
        circle.resize(40, 40);
        circle.attr({
            body: {
            },
            label: {
                text: '1',
            }
        });
        circle.addTo(graph);

        let circle2 = circle.clone();
        circle2.translate(300, 0);
        circle2.attr('label/text', '2');
        circle2.addTo(graph);

        let link = new joint.shapes.standard.Link();
        link.source(circle);
        link.target(circle2);
        link.addTo(graph);
    }

    render() {
        return (<div id={GRAPH_CONTAINER_ID}>Graph</div>)
    }


}

export default GraphEditor;
