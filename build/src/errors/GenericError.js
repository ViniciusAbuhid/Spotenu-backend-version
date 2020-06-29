"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericError = void 0;
const ErrorBase_1 = require("./ErrorBase");
class GenericError extends ErrorBase_1.ErrorBase {
    constructor(message) {
        super(message, 400);
    }
}
exports.GenericError = GenericError;
