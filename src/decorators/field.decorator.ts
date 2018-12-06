import {FieldConfig} from "../field/field.config";
import {FieldMetadata} from "../field/field.metadata";
import {FIELDS_METADATA_KEY} from "../metadata.keys";
import {SerializersFactory} from "../serializers";
import {Serializer} from "../serializers";
import {NoSerializerError} from "../errors";
import {Name} from './name.decorator';
import {Serializer as SerializerDecorator} from './serializer.decorator';


export function Field(): PropertyDecorator;
/**
 * @deprecated use @type {Name} and @type {Serializer} instead
 */
export function Field(config: FieldConfig): PropertyDecorator;
export function Field(config?: FieldConfig): PropertyDecorator {
    return (target, propertyKey: string | symbol) => {
        const metadata: FieldMetadata = <FieldMetadata>{modelPropertyName: propertyKey.toString(), ...(config || {})};
        Name(metadata.jsonPropertyName)(target, propertyKey);
        SerializerDecorator(metadata.serializer)(target, propertyKey);
    }
}
