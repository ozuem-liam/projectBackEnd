"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TPResponse {
    constructor({ data = {}, errors = [], message = '' }) {
        this.data = data;
        this.errors = errors;
        this.message = message;
    }
}
exports.default = TPResponse;
//# sourceMappingURL=TPResponse.js.map