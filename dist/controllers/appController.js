"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const HttpStatusCode_1 = __importDefault(require("../models/HttpStatusCode"));
const TPResponse_1 = __importDefault(require("../models/TPResponse"));
const sendSuccess = ({ response, data = {}, message = 'Request successful', }) => {
    const resp = new TPResponse_1.default({ data, message });
    return response.status(HttpStatusCode_1.default.SUCCESS).send(resp);
};
exports.sendSuccess = sendSuccess;
const sendError = ({ response, errors = [], message = 'Invalid requests', code = HttpStatusCode_1.default.INVALID_REQUEST, }) => {
    const resp = new TPResponse_1.default({
        data: {},
        message,
        errors: errors,
    });
    return response.status(code).send(resp);
};
exports.sendError = sendError;
//# sourceMappingURL=appController.js.map