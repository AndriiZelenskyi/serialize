import { Type, isType } from "../type";
import { Serializer as ISerializer, SerializersFactory } from "../serializers";
import { NoSerializerError } from "../errors/no-serializer.error";
import { __FIELD_SERIALIZER_METADATA_KEY } from "../metadata.keys";
import { defineFieldName } from "../field/field.metadata";

/**
 * Defines a serializer for any serialization or deserialization of your field
 */
export function Serializer(): PropertyDecorator;
/**
 * Defines a serializer by passed parameter @param modelType
 * Try to find a serializer for your model type in @type {SerializersFactory}
 *
 * @throws {NoSerializerError} if serializer was missing
 * @param modelType Constructor of model wich registered as {@Model}
 */
export function Serializer<T extends Object>(
  modelType: Type<T>
): PropertyDecorator;
/**
 * Defines your custom serializer for this field
 * It will be used for serialization and deserialization
 *
 * @param {ISerializer} serializer Custom serializer for this field only!
 */
export function Serializer<T extends Object>(serializer: ISerializer<T>): PropertyDecorator;
export function Serializer<T extends Object>(
  serializerOrType?: Type<T> | ISerializer<T>
): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    const key = propertyKey.toString();
    const serializer = getSerializerFromParams(
      Reflect.getMetadata("design:type", target, propertyKey),
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
  defaultType: Type<T>,
  propertyName: string,
  serializerOrType?: Type<T> | ISerializer<T>
): ISerializer<T> {
  if (typeof serializerOrType === "object") {
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
  type: Type<T>,
  propertyName: string
): ISerializer<T> {
  if (type === undefined) {
    throw new Error("Count find type for field: " + propertyName);
  }
  const serializer = SerializersFactory.instance.getSerializer(type);
  if (serializer === undefined) {
    throw new NoSerializerError(propertyName);
  }
  return serializer;
}
