"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_keys_1 = require("../metadata.keys");
var no_fields_error_1 = require("../errors/no-fields.error");
/**
 * Convert json for type that you need with updated names
 *
 * @param {Object} json
 * @param {Type<T extends Object>} modelType
 * @returns {T}
 */
function deserialize(json, modelType) {
    var model = new modelType();
    var modelPrototype = Object.getPrototypeOf(model);
    var fields = Reflect.getMetadata(metadata_keys_1.FIELDS_METADATA_KEY, modelPrototype);
    if (fields === undefined) {
        throw new no_fields_error_1.NoFieldsError();
    }
    // Simple serialization
    fields.forEach(function (fieldMetadata) {
        return model[fieldMetadata.propertyName] = fieldMetadata.serializer.deserialize(json[fieldMetadata.name]);
    });
    return model;
}
exports.deserialize = deserialize;
