"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function jwtTokens({ id, first_name, email }) {
    const customer = { id, first_name, email };
    const accessToken = jsonwebtoken_1.default.sign(customer, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
    const refreshToken = jsonwebtoken_1.default.sign(customer, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20m' });
    return ({ accessToken, refreshToken });
}
exports.jwtTokens = jwtTokens;
//# sourceMappingURL=jwt-helpers.js.map