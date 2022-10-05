import {AbstractGraph} from '../../state/model/abstractGraphModel';
import * as joint from 'jointjs';

export function abstractGraphToJointJsGraph(abstractGraph: AbstractGraph, graphWidth: number, graphHeight: number): joint.dia.Graph {
    const namespace = joint.shapes;
    const graph = new joint.dia.Graph({}, {cellNamespace: namespace});
    const vertexMap: Map<number, joint.shapes.standard.Circle> = new Map();

    abstractGraph.vertices.forEach((vertex) => {
        const circle= new joint.shapes.standard.Circle();
        circle.position(vertex.x / 100 * graphWidth, vertex.x / 100 * graphHeight);
        circle.resize(40, 40);
        circle.attr({
            body: {},
            label: {
                text: vertex.label,
            }
        });
        vertexMap.set(vertex.id, circle);
    });

    vertexMap.forEach( (vertex) => {
        graph.addCell(vertex);
    });

    abstractGraph.edges.forEach((edge) => {
        const link = new joint.shapes.standard.Link();
        link.source(vertexMap.get(edge.from) as joint.dia.Cell);
        link.target(vertexMap.get(edge.to) as joint.dia.Cell);
        link.addTo(graph);
    });

    return graph;
}