import * as joint from 'jointjs';

export function generateDemoGraph() : joint.dia.Graph {

    const namespace = joint.shapes;
    const graph = new joint.dia.Graph({}, {cellNamespace: namespace});
    const circle = new joint.shapes.standard.Circle();
    circle.position(getRandomCoordinateValue(), getRandomCoordinateValue());
    circle.resize(40, 40);
    circle.attr({
        body: {},
        label: {
            text: '1',
        }
    });
    circle.addTo(graph);

    const circle2 = circle.clone();
    circle2.position(getRandomCoordinateValue(), getRandomCoordinateValue());
    circle2.attr('label/text', '2');
    circle2.addTo(graph);

    const link = new joint.shapes.standard.Link();
    link.source(circle);
    link.target(circle2);
    link.addTo(graph);

    return graph;
}

function getRandomCoordinateValue(): number {
    const possibleCoordinateValues = [100, 150, 200, 250, 300];
    return possibleCoordinateValues[Math.floor(Math.random() * possibleCoordinateValues.length)];
}


