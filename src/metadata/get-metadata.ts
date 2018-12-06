import { FieldMetadata } from "../field/field.metadata";
import { __FIELD_CLASS_FIELDS_METADATA_KEY, __FIELD_JSON_NAME_METADATA_KEY, __FIELD_SERIALIZER_METADATA_KEY } from "./metadata.keys";

export function getMetadata<T>(type: any): FieldMetadata[] {
    const properties: string[] = Array.from((<Set<string>>Reflect.getMetadata(__FIELD_CLASS_FIELDS_METADATA_KEY, type) || new Set()).values());
    return properties
      .filter(isMetadataPresentForField(type))
      .map(v => getMetadataFromField(type, v));
  }
  
  function isMetadataPresentForField(
    target: Object
  ): (propertyKey: string) => boolean {
    return propertyKey =>
      Reflect.hasMetadata(__FIELD_JSON_NAME_METADATA_KEY, target, propertyKey) &&
      Reflect.hasMetadata(__FIELD_SERIALIZER_METADATA_KEY, target, propertyKey);
  }
  
  function getMetadataFromField(
    target: Object,
    modelPropertyKey: string
  ): FieldMetadata {
    const jsonPropertyName = Reflect.getMetadata(
      __FIELD_JSON_NAME_METADATA_KEY,
      target,
      modelPropertyKey
    );
    const serializer = Reflect.getMetadata(
      __FIELD_SERIALIZER_METADATA_KEY,
      target,
      modelPropertyKey
    );
    return {
      modelPropertyName: modelPropertyKey,
      jsonPropertyName,
      serializer
    };
  }
  