"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { authenticateToken } from '../middlewares/auth';
const index_1 = __importDefault(require("../controllers/index"));
const customer_1 = require("../databases/schemas/customer");
function default_1(fastify, opt, next) {
    fastify.post('/', customer_1.postCustomerSchema, index_1.default.customer.createCustomer);
    fastify.patch('/auth/login', index_1.default.customer.loginUser);
    // fastify.get('/dashboard');
    //   fastify.patch('/reset', account.resetPassword);
    // fastify.patch(
    //   '/auth',
    //   customer.customer.sendVerificationToken,
    // );
    next();
}
exports.default = default_1;
//# sourceMappingURL=customer.js.map