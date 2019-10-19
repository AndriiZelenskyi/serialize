export interface Serializer<T extends Object> {
  serialize(model: T, additionalInfo?: any): Object | null;

  deserialize(json: Object, additionalInfo?: any): T | null;
}
