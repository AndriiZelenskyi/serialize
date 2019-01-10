import { FieldConfig } from './field.config';
import { Serializer } from '../serializers';

export interface FieldMetadata extends FieldConfig {
  /**
   * Name of property in Model
   */
  modelPropertyName: string;
  /**
   * JSON jsonPropertyName
   */
  jsonPropertyName: string;
  serializer: Serializer<any>;
}
