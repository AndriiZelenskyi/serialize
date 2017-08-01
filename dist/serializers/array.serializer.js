"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArraySerializer = (function () {
    function ArraySerializer(serializer) {
        this.serialize = function (model) { return model.map(serializer.serialize); };
        this.deserialize = function (json) { return json ? json.map(serializer.deserialize) : null; };
    }
    return ArraySerializer;
}());
exports.ArraySerializer = ArraySerializer;
