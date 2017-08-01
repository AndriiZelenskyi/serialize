"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serialize_1 = require("../converters/serialize");
var deserialize_1 = require("../converters/deserialize");
var ModelSerializer = (function () {
    function ModelSerializer(type) {
        this.type = type;
        this.serialize = function (model) { return model ? serialize_1.serialize(model) : null; };
        this.deserialize = function (json) { return json ? deserialize_1.deserialize(json, type) : null; };
    }
    return ModelSerializer;
}());
exports.ModelSerializer = ModelSerializer;
