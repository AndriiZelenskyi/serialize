import { Serializer } from "./serializer";
export declare class PrimitiveSerializer implements Serializer<Primitive> {
    serialize: (model: Primitive) => Object;
    deserialize: (json: Object) => Primitive;
    constructor();
}
export declare type Primitive = string | symbol | number;
