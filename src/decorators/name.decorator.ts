import {__FIELD_JSON_NAME_METADATA_KEY} from '../metadata.keys';
import 'reflect-metadata'

// TODO: Add examples in JSDoc
/**
 * 
 * This decorator defines a property name in JSON format.
 * Can be used with name as point
 * 
 * @param jsonPropertyName {string} Name of field in JSON format.
 */
export function Name(): PropertyDecorator;
export function Name(jsonPropertyName: string): PropertyDecorator;
export function Name(jsonPropertyName?: string): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const key: string = propertyKey.toString();
        const jsonKey = jsonPropertyName || key;
        Reflect.defineMetadata(__FIELD_JSON_NAME_METADATA_KEY, jsonKey, target, propertyKey);
    }
} 