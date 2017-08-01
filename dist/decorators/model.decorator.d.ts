import { Serializer } from "../serializers/serializer";
import { Type } from "../type";
export declare function Model(serializer?: Serializer<any>): (target: Type<any>) => void;
