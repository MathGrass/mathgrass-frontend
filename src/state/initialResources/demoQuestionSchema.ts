import {AssessmentSchema} from "../taskSlice";

export function getDemoAssessmentSchema(): AssessmentSchema {
    return {
        schema: {
            title: 'Graph assessment',
            type: 'object',
            required: ['isPlanar'],
            properties: {
                isPlanar: {type: 'boolean', title: 'Is the graph planar?'}
            }
        },
        uiSchema: {
            isPlanar: {
                'ui:widget': 'radio'
            }
        }
    };
}