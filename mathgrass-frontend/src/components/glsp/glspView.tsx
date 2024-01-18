import React, { useEffect } from "react";
import { GLSPModelClient } from '@mathgrass-glsp/client';
import '@vscode/codicons/dist/codicon.css';
import "./glspView.css";

const port = 8081;
const id = 'workflow';
const diagramType = 'workflow-diagram';

const GlspView = () => {

    useEffect(() => {

        // Mount
        const client = new GLSPModelClient(port, id, diagramType, './examples/workflow-standalone/app/example1.wf');
        client.bindGLSPModelClient("sprotty");
        // Unmount
        return () => {
            client.unbindGLSPModelClient();
        }
    });

    return <div className="sprotty_wrapper">
        <div id="sprotty"></div>
    </div>;
}

export default GlspView;