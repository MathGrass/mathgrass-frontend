import {JsonFormTuple} from '../applicationState';

export function getDemoAssessmentSchema(): JsonFormTuple {
    return {
        schema: {
            title: 'Graph assessment',
            type: 'object',
            required: ['isX', 'isY', 'isZ'],
            properties: {
                isX: {type: 'boolean', title: 'Does the graph have property X?'},
                isY: {type: 'boolean', title: 'Does the graph have property Y?'},
                isZ: {type: 'boolean', title: 'Does the graph have property Z?'}
            }
        },
        uiSchema: {
            isX: {
                'ui:widget': 'radio'
            },
            isY: {
                'ui:widget': 'radio'
            },
            isZ: {
                'ui:widget': 'radio'
            }
        }
    };
}