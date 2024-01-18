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
 * Check if a given object implements the TaskIdLabelTupleDTO interface.
 */
export function instanceOfTaskIdLabelTupleDTO(value) {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "label" in value;
    return isInstance;
}
export function TaskIdLabelTupleDTOFromJSON(json) {
    return TaskIdLabelTupleDTOFromJSONTyped(json, false);
}
export function TaskIdLabelTupleDTOFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': json['id'],
        'label': json['label'],
    };
}
export function TaskIdLabelTupleDTOToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'label': value.label,
    };
}
