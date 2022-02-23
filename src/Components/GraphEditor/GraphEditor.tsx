import React from 'react';
import * as joint from 'jointjs'


class GraphEditor extends React.Component {

    componentDidMount() {
        let namespace = joint.shapes;

        let graph = new joint.dia.Graph({}, {cellNamespace: namespace});

        new joint.dia.Paper({
            // @ts-ignore
            el: document.getElementById('mathGrassEditor'),
            model: graph,
            width: 800,
            height: 400,
            gridSize: 1,
            cellViewNamespace: namespace
        });

        let circle = new joint.shapes.standard.Circle();
        circle.position(100, 30);
        circle.resize(100, 40);
        circle.attr({
            body: {
                fill: 'blue'
            },
            label: {
                text: '1',
                fill: 'white'
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
        return (<div id="mathGrassEditor">Graph</div>)
    }


}

export default GraphEditor;
