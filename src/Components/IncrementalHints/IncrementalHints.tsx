import React from 'react';

type IncrementalHintsProps = {}

type IncrementalHintsState = {}

class IncrementalHints extends React.Component {

    constructor(props: IncrementalHintsProps, state: IncrementalHintsState) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <button type={"submit"}>Request Hint</button>
                <div id=""></div>
            </div>)
    }


}

export default IncrementalHints;
