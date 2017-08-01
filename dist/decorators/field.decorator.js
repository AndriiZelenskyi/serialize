"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var metadata_keys_1 = require("../metadata.keys");
var serializers_factory_1 = require("../serializers/serializers.factory");
var no_serializer_error_1 = require("../errors/no-serializer.error");
function Field(config) {
    return function (target, propertyKey) {
        var fieldsMetadata = Reflect.getMetadata(metadata_keys_1.FIELDS_METADATA_KEY, target) || [];
        var metadata = __assign({ propertyName: propertyKey, name: propertyKey, serializer: getSerializer() }, config);
        Reflect.defineMetadata(metadata_keys_1.FIELDS_METADATA_KEY, fieldsMetadata.concat([metadata]), target);
        function getSerializer() {
            var fieldType = Reflect.getMetadata('design:type', target, propertyKey);
            if (!!config && !!config.serializer) {
                return config.serializer;
            }
            var serializer = serializers_factory_1.SerializersFactory.instance.getSerializer(fieldType);
            if (serializer === undefined) {
                console.log(fieldType);
                throw new no_serializer_error_1.NoSerializerError(propertyKey);
            }
            return serializer;
        }
    };
}
exports.Field = Field;
