"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_ERROR_MESSAGE = 'No serializer! Use serializer from config or serializer factory!';
var NoSerializerError = (function (_super) {
    __extends(NoSerializerError, _super);
    function NoSerializerError(fieldKey, message) {
        if (message === void 0) { message = DEFAULT_ERROR_MESSAGE; }
        var _this = _super.call(this, message + ". For field key: " + fieldKey) || this;
        _this.fieldKey = fieldKey;
        _this.name = "NoSerializerError";
        return _this;
    }
    return NoSerializerError;
}(Error));
exports.NoSerializerError = NoSerializerError;
