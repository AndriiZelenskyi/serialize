import { Serializer } from "./serializer";
export declare class DateSerializer implements Serializer<Date> {
    serialize: (model: Date) => Object;
    deserialize: (json: Object) => Date;
    constructor();
}
