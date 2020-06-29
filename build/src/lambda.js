"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const lbn_lambda_express_1 = require("lbn-lambda-express");
const index_1 = require("./index");
exports.handler = lbn_lambda_express_1.createLambdaHandler(index_1.app);
