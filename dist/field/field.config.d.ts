import { Serializer } from "../serializers/serializer";
export interface FieldConfig {
    name?: string | symbol;
    serializer?: Serializer<any>;
}
