/* tslint:disable */
/* eslint-disable */
/**
 * MathGrass
 * This is the OpenAPI specification for MathGrass
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: andreas.domanowski@tu-dresden.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/**
 * Check if a given object implements the EvaluateAnswer200Response interface.
 */
export function instanceOfEvaluateAnswer200Response(value) {
    let isInstance = true;
    isInstance = isInstance && "isAssessmentCorrect" in value;
    return isInstance;
}
export function EvaluateAnswer200ResponseFromJSON(json) {
    return EvaluateAnswer200ResponseFromJSONTyped(json, false);
}
export function EvaluateAnswer200ResponseFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'isAssessmentCorrect': json['isAssessmentCorrect'],
    };
}
export function EvaluateAnswer200ResponseToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'isAssessmentCorrect': value.isAssessmentCorrect,
    };
}