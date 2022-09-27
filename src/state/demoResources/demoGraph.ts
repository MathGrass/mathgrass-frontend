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

    const circle3 = circle.clone();
    circle3.position(getRandomCoordinateValue(), getRandomCoordinateValue());
    circle3.attr('label/text', '3');
    circle3.addTo(graph);

    const circle4 = circle.clone();
    circle4.position(getRandomCoordinateValue(), getRandomCoordinateValue());
    circle4.attr('label/text', '4');
    circle4.addTo(graph);

    const circle5 = circle.clone();
    circle5.position(getRandomCoordinateValue(), getRandomCoordinateValue());
    circle5.attr('label/text', '5');
    circle5.addTo(graph);

    const link = new joint.shapes.standard.Link();
    link.source(circle);
    link.target(circle2);
    link.addTo(graph);

    const link2 = new joint.shapes.standard.Link();
    link2.source(circle3);
    link2.target(circle4);
    link2.addTo(graph);

    const link3 = new joint.shapes.standard.Link();
    link3.source(circle5);
    link3.target(circle);
    link3.addTo(graph);

    const link4 = new joint.shapes.standard.Link();
    link4.source(circle2);
    link4.target(circle);
    link4.addTo(graph);

    const link5 = new joint.shapes.standard.Link();
    link5.source(circle3);
    link5.target(circle2);
    link5.addTo(graph);

    const link6 = new joint.shapes.standard.Link();
    link6.source(circle4);
    link6.target(circle3);
    link6.addTo(graph);

    const link7 = new joint.shapes.standard.Link();
    link7.source(circle5);
    link7.target(circle4);
    link7.addTo(graph);

    return graph;
}

function getRandomCoordinateValue(): number {
    const possibleCoordinateValues = [100, 150, 200, 250, 300, 350, 400];
    return possibleCoordinateValues[Math.floor(Math.random() * possibleCoordinateValues.length)];
}


