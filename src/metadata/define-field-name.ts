import { __FIELD_CLASS_FIELDS_METADATA_KEY } from './metadata.keys';

export function defineFieldName(target: Object, propertyName: string | symbol): void {
  const currentSet: Set<string> = Reflect.getMetadata(__FIELD_CLASS_FIELDS_METADATA_KEY, target);
  if (currentSet === undefined) {
    const fields = new Set([propertyName.toString()]);
    Reflect.defineMetadata(__FIELD_CLASS_FIELDS_METADATA_KEY, fields, target);
  } else {
    currentSet.add(propertyName.toString());
  }
}
