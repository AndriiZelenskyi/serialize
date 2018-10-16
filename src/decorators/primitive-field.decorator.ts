import {Field} from './field.decorator';
import { PrimitiveSerializer } from '../serializers/primitive.serializer';

export function primitiveField(name?: string): PropertyDecorator {
    return Field({serializer: new PrimitiveSerializer(), jsonPropertyName: name});
}