import {FIELDS_METADATA_KEY} from "./metadata.keys";
import {FieldMetadata} from "./field.metadata";


/**
 * Convert model to json with metadata names
 *
 * Fields that not are labeled as {@link SerializableField} will be ignore
 *
 * @param {Object} model Serializable model that was convert to json
 * @returns {Object} JSON object
 */
export function serialize(model: Object): Object {
    const modelPrototype = Object.getPrototypeOf(model);
    const fields = Reflect.getMetadata(FIELDS_METADATA_KEY, modelPrototype) as FieldMetadata[] | undefined;

    if(fields === undefined) {
        throw new Error('Model without available fields for serialization. Did you miss SerializableField()?');
    }

    // Convert array of field metadata to json object
    return fields.reduce((previousValue: Object, currentValue: FieldMetadata) => {
        (previousValue as any)[currentValue.name] = (model as any)[currentValue.propertyName];
        return previousValue;
    }, {});
}