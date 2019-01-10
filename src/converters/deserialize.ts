import { Constructor } from '../type';
import { FieldMetadata } from '../field/field.metadata';
import { NoFieldsError } from '../errors';
import { getPropertyOfJson, parseJsonPropertyName } from './json-utils';
import { getMetadata } from '../metadata/get-metadata';

/**
 * Convert json for type that you need with updated names
 *
 * @param {Object} json
 * @param {Constructor<T extends Object>} modelType
 * @returns {T}
 */
export function deserialize<T extends Object>(
  json: Object,
  modelType: Constructor<T>
): T {
  const model = new modelType();
  const modelPrototype = Object.getPrototypeOf(model);
  const fields = getMetadata(modelPrototype);

  if (fields.length === 0) {
    throw new NoFieldsError();
  }

  // Simple serialization
  fields.forEach(getDeserialization(model, json));

  return model;
}

function setFieldMetadataToModel(
  model: { [k: string]: any },
  fieldMetadata: FieldMetadata,
  json: Object
): void {
  const address = parseJsonPropertyName(<string>fieldMetadata.jsonPropertyName);
  const jsonValue = getPropertyOfJson(json, address);
  if (jsonValue !== null) {
    model[
      fieldMetadata.modelPropertyName
      ] = fieldMetadata.serializer.deserialize(jsonValue);
  }
}

function getDeserialization(
  model: Object,
  json: Object
): (fieldMetadata: FieldMetadata) => void {
  return fieldMetadata => setFieldMetadataToModel(model, fieldMetadata, json);
}
