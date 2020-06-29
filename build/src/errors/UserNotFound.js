"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFound = void 0;
const ErrorBase_1 = require("./ErrorBase");
class UserNotFound extends ErrorBase_1.ErrorBase {
    constructor(message) {
        super(message, 404);
    }
}
exports.UserNotFound = UserNotFound;
