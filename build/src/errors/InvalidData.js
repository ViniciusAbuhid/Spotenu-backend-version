"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidData = void 0;
const ErrorBase_1 = require("./ErrorBase");
class InvalidData extends ErrorBase_1.ErrorBase {
    constructor(message) {
        super(message, 422);
    }
}
exports.InvalidData = InvalidData;
