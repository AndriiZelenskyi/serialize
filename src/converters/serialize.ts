import {FIELDS_METADATA_KEY} from "../metadata.keys";
import {FieldMetadata} from "../field/field.metadata";
import {NoFieldsError} from "../errors";


/**
 * Convert model to json with metadata names
 *
 * Fields that not are labeled as {@link Field} will be ignore
 *
 * @param {Object} model Serializable model that was convert to json
 * @returns {Object} Server object
 */
export function serialize(model: Object): Object {
    const modelPrototype = Object.getPrototypeOf(model);
    const fields = Reflect.getMetadata(FIELDS_METADATA_KEY, modelPrototype) as FieldMetadata[] | undefined;

    if(fields === undefined) {
        throw new NoFieldsError();
    }

    // Convert array of field metadata to json object
    return fields.reduce((previousValue: Object, currentValue: FieldMetadata) => {
        (previousValue as any)[currentValue.jsonPropertyName] = currentValue.serializer.serialize((model as any)[currentValue.modelPropertyName]);
        return previousValue;
    }, {});
}