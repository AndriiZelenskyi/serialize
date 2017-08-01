"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrimitiveSerializer = (function () {
    function PrimitiveSerializer() {
        this.serialize = function (model) { return model; };
        this.deserialize = function (json) { return json; };
    }
    return PrimitiveSerializer;
}());
exports.PrimitiveSerializer = PrimitiveSerializer;
