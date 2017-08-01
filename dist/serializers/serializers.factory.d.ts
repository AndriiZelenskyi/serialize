import { Type } from "../type";
import { Serializer } from "./serializer";
export declare class SerializersFactory {
    private serializersMap;
    private constructor();
    getSerializer<T>(type: Type<T>): Serializer<T> | undefined;
    registerSerializer<T>(type: Type<T>, serializer: Serializer<T>): void;
    static readonly instance: SerializersFactory;
}
