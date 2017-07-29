
export interface Serializer<T extends Object> {
    serialize: (model: T) => Object;
    deserialize: (json: Object) => T;
}
