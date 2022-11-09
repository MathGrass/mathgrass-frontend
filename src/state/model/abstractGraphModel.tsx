export interface AbstractGraph {
    vertices: Vertex[];
    edges: Edge[];
}

export interface Vertex {
    x: number;
    y: number;
    id: number;
    label: string;
}

export interface Edge{
    from: number;
    to: number;
}