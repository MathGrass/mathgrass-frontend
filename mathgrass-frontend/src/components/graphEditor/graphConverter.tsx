import * as joint from 'jointjs';
import { GraphDTO } from '../../src-gen/mathgrass-api';

export function abstractGraphToJointJsGraph(abstractGraph: GraphDTO, graphWidth: number, graphHeight: number): joint.dia.Graph {
    const namespace = joint.shapes;
    const graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    const vertexMap: Map<number, joint.shapes.standard.Circle> = new Map();

    abstractGraph.vertices.forEach((vertex) => {
        const circle = new joint.shapes.standard.Circle();
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

    vertexMap.forEach((vertex) => {
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

export function createCircle(positionX: number, positionY: number, label?: string, id?: number): joint.shapes.standard.Circle {
    const circle = new joint.shapes.standard.Circle();
    circle.position(positionX, positionY);
    circle.resize(40, 40);
    circle.attr({
        body: {},
        label: {
            text: label,
        },
    });
    return circle;
}

export function getVertexToolsView(): joint.dia.ToolsView {
    // let boundaryTool = new joint.elementTools.Boundary();
    let removeButton = new joint.elementTools.Remove({offset: {x: 5, y: 5}});
    const connect1 = new joint.elementTools.Connect({
        offset: {x: 35, y: 5}
    });

    let toolsView = new joint.dia.ToolsView({
        tools: [
            // boundaryTool,
            removeButton,
            connect1
        ]
    });
    return toolsView
}

function getSmallestFreeIndex(vertexMap: Map<number, joint.shapes.standard.Circle>): number {
    let index = 0;
    while (vertexMap.get(0) != null) {
        index++;
    }
    return index;
}