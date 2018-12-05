import {Serializer} from "../serializers";

export interface FieldConfig {
    jsonPropertyName?: string;
    serializer?: Serializer<any>;
}
