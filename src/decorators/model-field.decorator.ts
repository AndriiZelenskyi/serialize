import { Field } from "./field.decorator";
import { ModelSerializer } from "../serializers";

export function modelField<T>(model: {new(): T}, name?: string): PropertyDecorator {
    return Field({serializer: new ModelSerializer(model), jsonPropertyName: name});
}