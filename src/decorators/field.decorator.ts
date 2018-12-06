import {FieldConfig} from "../field/field.config";
import {Serializer} from "../serializers";
import {Name} from './name.decorator';
import {Serializer as SerializerDecorator} from './serializer.decorator';
import { __FIELD_JSON_NAME_METADATA_KEY, __FIELD_SERIALIZER_METADATA_KEY } from "../metadata/metadata.keys";


/**
 * Defines default Name and Serializer decorators if no one of them was not defined
 */
export function Field(): PropertyDecorator;
/**
 * @deprecated use @type {Name} and @type {Serializer} instead
 */
export function Field(config: FieldConfig): PropertyDecorator;
export function Field(config?: FieldConfig): PropertyDecorator {
    return combine(config && config.jsonPropertyName, config && config.serializer);
}

function combine<T>(name?: string, serializer?: Serializer<T>): PropertyDecorator {
    return (target, key) => {
        if(!Reflect.hasMetadata(__FIELD_JSON_NAME_METADATA_KEY, target, key)) {
            Name(<any>name)(target, key);
        }
        if(!Reflect.hasMetadata(__FIELD_SERIALIZER_METADATA_KEY, target, key)) {
            SerializerDecorator(<any>serializer)(target, key);
        }
    }
}
