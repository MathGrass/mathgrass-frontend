import * as joint from 'jointjs';
import {GraphDTO} from '../../src-gen/mathgrass-api';

export function abstractGraphToJointJsGraph(abstractGraph: GraphDTO, graphWidth: number, graphHeight: number): joint.dia.Graph {
    const namespace = joint.shapes;
    const graph = new joint.dia.Graph({}, {cellNamespace: namespace});
    const vertexMap: Map<number, joint.shapes.standard.Circle> = new Map();

    abstractGraph.vertices.forEach((vertex) => {
        const circle= new joint.shapes.standard.Circle();
        circle.position(vertex.x / 100 * graphWidth, vertex.y / 100 * graphHeight);
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
        link.source(vertexMap.get(edge.firstVertex.id) as joint.dia.Cell);
        link.target(vertexMap.get(edge.secondVertex.id) as joint.dia.Cell);
        link.addTo(graph);
    });

    return graph;
}