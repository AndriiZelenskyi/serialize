import { FieldConfig } from '..';
import { Serializer } from '../serializers';
import { Name } from './name.decorator';
import { Type } from './type.decorator';
import { __FIELD_JSON_NAME_METADATA_KEY, __FIELD_SERIALIZER_METADATA_KEY } from '../metadata/metadata.keys';


/**
 * Defines default Name and Serializer decorators if no one of them was not defined
 */
export function Field(): PropertyDecorator;
/**
 * @deprecated use {@link Name} and {@link Serializer} instead
 */
export function Field(config: FieldConfig): PropertyDecorator;
export function Field(config?: FieldConfig): PropertyDecorator {
  return combine(config && config.jsonPropertyName, config && config.serializer);
}

function combine<T>(name?: string, serializer?: Serializer<T>): PropertyDecorator {
  return (target, key) => {
    if (!Reflect.hasMetadata(__FIELD_JSON_NAME_METADATA_KEY, target, key)) {
      Name(<any>name)(target, key);
    }
    if (!Reflect.hasMetadata(__FIELD_SERIALIZER_METADATA_KEY, target, key)) {
      Type(<any>serializer)(target, key);
    }
  };
}
