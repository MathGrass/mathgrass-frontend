import React from "react";
import Form from "@rjsf/core";

class Assessment extends React.Component {

    render() {
        const schema= {
            title: "Graph Assessment",
            type: "object",
            required: ["isPlanar"],
            properties: {
                isPlanar: {type: "boolean", title: "Is the graph planar?"}
            }
        };

        const uiSchema =  {
            isPlanar: {
                "ui:widget": "radio"
            }
        };


        const log = (type) => console.log.bind(console, type);

        return (<Form schema={schema}
                      uiSchema={uiSchema}
                      onChange={log("changed")}
                      onSubmit={log("submitted")}
                      onError={log("errors")}/>);
    }
}

export default Assessment;