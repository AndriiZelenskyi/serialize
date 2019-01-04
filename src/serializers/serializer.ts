
export interface Serializer<T extends Object> {
    serialize(model: T): Object | null;
    deserialize(json: Object): T | null;
}
