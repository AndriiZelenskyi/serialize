import {Serializer} from "./serializer";

export class DateSerializer implements Serializer<Date> {
    serialize: (model: Date) => Object;
    deserialize: (json: Object) => Date;


    constructor() {
        this.serialize = model => model.toISOString();
        this.deserialize = json => new Date(<string>json);
    }
}