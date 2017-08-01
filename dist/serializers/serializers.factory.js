"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var primitive_serializer_1 = require("./primitive.serializer");
var date_serializer_1 = require("./date.serializer");
var instance;
var SerializersFactory = (function () {
    // noinspection JSUnusedLocalSymbols
    function SerializersFactory() {
        this.serializersMap = new Map();
    }
    SerializersFactory.prototype.getSerializer = function (type) {
        return this.serializersMap.get(type);
    };
    SerializersFactory.prototype.registerSerializer = function (type, serializer) {
        this.serializersMap.set(type, serializer);
    };
    Object.defineProperty(SerializersFactory, "instance", {
        get: function () {
            if (!instance) {
                instance = new SerializersFactory();
                instance.registerSerializer(Number, new primitive_serializer_1.PrimitiveSerializer());
                instance.registerSerializer(String, new primitive_serializer_1.PrimitiveSerializer());
                instance.registerSerializer(Date, new date_serializer_1.DateSerializer());
            }
            return instance;
        },
        enumerable: true,
        configurable: true
    });
    return SerializersFactory;
}());
exports.SerializersFactory = SerializersFactory;
