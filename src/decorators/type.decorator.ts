import { Constructor } from '../type';
import { Serializer as ISerializer, SerializersFactory } from '../serializers';
import { NoSerializerError } from '../errors';
import { __FIELD_SERIALIZER_METADATA_KEY } from '../metadata/metadata.keys';
import { defineFieldName } from '../metadata/define-field-name';

/**
 * Defines a serializer for any serialization or deserialization of your field
 */
export function Type(): PropertyDecorator;
/**
 * Defines a serializer by passed parameter @param modelType
 * Try to find a serializer for your model type in {@link SerializersFactory}
 *
 * @throws {NoSerializerError} if serializer was missing
 * @param modelType Constructor of model wich registered as {@Model}
 */
export function Type<T extends Object>(
  modelType: Constructor<T>
): PropertyDecorator;
/**
 * Defines your custom serializer for this field
 * It will be used for serialization and deserialization
 *
 * @param serializer Custom serializer for this field only!
 */
export function Type<T extends Object>(
  serializer: ISerializer<T>
): PropertyDecorator;
export function Type<T extends Object>(
  serializerOrType?: Constructor<T> | ISerializer<T>
): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    const key = propertyKey.toString();
    const serializer = getSerializerFromParams(
      Reflect.getMetadata('design:type', target, propertyKey),
      key,
      serializerOrType
    );
    Reflect.defineMetadata(
      __FIELD_SERIALIZER_METADATA_KEY,
      serializer,
      target,
      key
    );
    defineFieldName(target, key);
  };
}

function getSerializerFromParams<T>(
  defaultType: Constructor<T>,
  propertyName: string,
  serializerOrType?: Constructor<T> | ISerializer<T>
): ISerializer<T> {
  if (typeof serializerOrType === 'object') {
    return serializerOrType;
  }
  return getSerializerForType(serializerOrType || defaultType, propertyName);
}

/**
 * @throws {NoSerializerError} if serializer for this type not found
 * @throws {Error} if type was undefined
 * @param type Model type
 */
function getSerializerForType<T>(
  type: Constructor<T>,
  propertyName: string
): ISerializer<T> {
  if (type === undefined) {
    throw new Error('Count find type for field: ' + propertyName);
  }
  const serializer = SerializersFactory.instance.getSerializer(type);
  if (serializer === undefined) {
    throw new NoSerializerError(propertyName);
  }
  return serializer;
}
