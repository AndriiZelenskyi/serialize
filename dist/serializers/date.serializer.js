"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateSerializer = (function () {
    function DateSerializer() {
        this.serialize = function (model) { return model.toISOString(); };
        this.deserialize = function (json) { return new Date(json); };
    }
    return DateSerializer;
}());
exports.DateSerializer = DateSerializer;
