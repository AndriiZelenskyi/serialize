"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_keys_1 = require("../metadata.keys");
var no_fields_error_1 = require("../errors/no-fields.error");
/**
 * Convert model to json with metadata names
 *
 * Fields that not are labeled as {@link Field} will be ignore
 *
 * @param {Object} model Serializable model that was convert to json
 * @returns {Object} Server object
 */
function serialize(model) {
    var modelPrototype = Object.getPrototypeOf(model);
    var fields = Reflect.getMetadata(metadata_keys_1.FIELDS_METADATA_KEY, modelPrototype);
    if (fields === undefined) {
        throw new no_fields_error_1.NoFieldsError();
    }
    // Convert array of field metadata to json object
    return fields.reduce(function (previousValue, currentValue) {
        previousValue[currentValue.name] = currentValue.serializer.serialize(model[currentValue.propertyName]);
        return previousValue;
    }, {});
}
exports.serialize = serialize;
