import {Type} from "../type";
import {FIELDS_METADATA_KEY} from "../metadata.keys";
import {FieldMetadata} from "../field/field.metadata";
import {NoFieldsError} from "../errors";
import {getPropertyOfJson, parseJsonPropertyName} from "./json-utils";

/**
 * Convert json for type that you need with updated names
 *
 * @param {Object} json
 * @param {Type<T extends Object>} modelType
 * @returns {T}
 */
export function deserialize<T extends Object>(json: Object, modelType: Type<T>): T {
    const model = new modelType();
    const modelPrototype = Object.getPrototypeOf(model);
    const fields = Reflect.getMetadata(FIELDS_METADATA_KEY, modelPrototype) as FieldMetadata[] | undefined;

    if(fields === undefined) {
        throw new NoFieldsError();
    }

    // Simple serialization
    fields.forEach(getDeserialization(model, json));

    return model;
}

function setFieldMetadataToModel(model: {[k: string]: any}, fieldMetadata: FieldMetadata, json: Object): void {
    model[fieldMetadata.modelPropertyName] = fieldMetadata.serializer.deserialize(getPropertyOfJson(json, parseJsonPropertyName(<string>fieldMetadata.jsonPropertyName)) || {})
}

function getDeserialization(model: Object, json: Object): (fieldMetadata: FieldMetadata) => void {
    return fieldMetadata => setFieldMetadataToModel(model, fieldMetadata, json);
}