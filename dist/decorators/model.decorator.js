"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_serializer_1 = require("../serializers/model.serializer");
var serializers_factory_1 = require("../serializers/serializers.factory");
function Model(serializer) {
    return function (target) {
        serializers_factory_1.SerializersFactory.instance.registerSerializer(target, serializer || new model_serializer_1.ModelSerializer(target));
    };
}
exports.Model = Model;
