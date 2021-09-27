"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAMatchPassword = exports.hashPassword = exports.generateToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken = (customer) => {
    const { email, first_name, password } = customer;
    const token = fastify.jwt.sign({ email, first_name, password }, { expiresIn: 86400 });
    return token;
};
exports.generateToken = generateToken;
const hashPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt();
    return bcrypt_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
const isAMatchPassword = async (plainPassword, hashPassword) => {
    return await bcrypt_1.default.compare(plainPassword, hashPassword);
};
exports.isAMatchPassword = isAMatchPassword;
//# sourceMappingURL=appService.js.map