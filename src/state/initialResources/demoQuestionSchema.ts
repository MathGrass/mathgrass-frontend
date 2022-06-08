import {AssessmentSchema} from '../taskSlice';

export function getDemoAssessmentSchema(): AssessmentSchema {
    return {
        assessmentSchema: {
            title: 'Graph assessment',
            type: 'object',
            required: ['isPlanar'],
            properties: {
                isPlanar: {type: 'boolean', title: 'Is the graph planar?'}
            }
        },
        assessmentUiSchema: {
            isPlanar: {
                'ui:widget': 'radio'
            }
        }
    };
}