import { __FIELD_JSON_NAME_METADATA_KEY } from '../metadata/metadata.keys';
import 'reflect-metadata';
import { defineFieldName } from '../metadata/define-field-name';

// TODO: Add examples in JSDoc

export function Name(): PropertyDecorator;
/**
 *
 * Define a property name in JSON format.
 * Can be used with name as point
 *
 * @param jsonPropertyName Name of field in JSON format.
 */
export function Name(jsonPropertyName: string): PropertyDecorator;
export function Name(jsonPropertyName?: string): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const key: string = propertyKey.toString();
    const jsonKey = jsonPropertyName || key;
    Reflect.defineMetadata(__FIELD_JSON_NAME_METADATA_KEY, jsonKey, target, propertyKey);
    defineFieldName(target, key);
  };
}
