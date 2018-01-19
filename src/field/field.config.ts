import {Serializer} from "../serializers";

export interface FieldConfig {
    jsonPropertyName?: string | symbol;
    serializer?: Serializer<any>;
}
