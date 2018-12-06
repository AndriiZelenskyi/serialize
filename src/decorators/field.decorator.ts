import {FieldConfig} from "../field/field.config";
import {Serializer} from "../serializers";
import {Name} from './name.decorator';
import {Serializer as SerializerDecorator} from './serializer.decorator';


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
        Name(<any>name)(target, key);
        SerializerDecorator(<any>serializer)(target, key);
    }
}
