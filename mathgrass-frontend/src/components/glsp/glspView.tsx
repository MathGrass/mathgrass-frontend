import { useEffect } from "react";
import { mountGlspClient, unmountGlspClient } from "./glspClientWrapper";

const GlspView = () => {

    useEffect(() => {
        // Mount
        mountGlspClient();
        // Unmount
        return () => {
            unmountGlspClient();
        }
    });

    return (<div id="sprotty"></div>);
}

export default GlspView;