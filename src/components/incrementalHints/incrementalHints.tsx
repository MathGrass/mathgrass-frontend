import React from 'react';
import {JSONSchema7} from 'json-schema';
import Form from '@rjsf/core';

type IncrementalHintsProps = {};

type IncrementalHintsState = {
    hintLevel: number
};


const IncrementalHints = () => {
    const schema: JSONSchema7 = {
        title: 'Request Hint',
        type: 'object',
        properties: {
            hintLevel: {type: 'number', title: 'hintLevel'}
        }
    };

    const uiSchema = {
        hintLevel: {
            'ui:widget': 'hidden'
        }
    };

    return (<Form schema={schema}
                  uiSchema={uiSchema}
    />);
};


export default IncrementalHints;
