"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = exports.loginUser = void 0;
const customerService = __importStar(require("../services/customerService"));
const validator = __importStar(require("../utils/validation/validator"));
const validationSchema = __importStar(require("../utils/validation/schemas/customer"));
const appController_1 = require("./appController");
const jwt_helpers_1 = require("../utils/jwt-helpers");
const EmailClient_1 = require("../utils/EmailClient");
const appConfig = require('../configs/config');
// import  HttpStatusCode from '../models/HttpStatusCode';
const loginUser = async (request, response) => {
    try {
        const { errors, data } = validator.validate(validationSchema.customerSchemas.loginSchema, request.body);
        if (errors) {
            return (0, appController_1.sendError)({ response, errors });
        }
        const resp = await customerService.loginUser(data);
        //JWT
        let tokens = (0, jwt_helpers_1.jwtTokens)(resp.customer);
        response.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
        });
        response.json(tokens);
    }
    catch (error) {
        // return sendError({ response, errors });
        response.status(401).json({ error });
    }
};
exports.loginUser = loginUser;
const createCustomer = async (request, response) => {
    // const { errors, data } = validator.validate(
    //   validationSchema.customerSchemas.registrationSchema,
    //   request.body,
    // );
    // if (errors.length == 0) {
    //   console.log(errors);
    //   return sendError({ response, errors });
    // }
    const data = request.body;
    const resp = await customerService.createCustomer(data);
    console.log(resp);
    const { isSuccess, message, customer = {}, destination = '', } = resp;
    if (isSuccess) {
        // JWT
        let tokens = (0, jwt_helpers_1.jwtTokens)(customer);
        (0, EmailClient_1.sendEmail)(customer.email, "ozuemdw@gmail.com", 'Confirm Email', `Click link to confirm email http://localhost:5000/${tokens.accessToken}`);
        // response.cookie('refresh_token', tokens.accessToken, {
        //   httpOnly: true,
        // });
        console.log(tokens);
        return (0, appController_1.sendSuccess)({ response, message, data: { destination } });
    }
    return (0, appController_1.sendError)({ response, message });
};
exports.createCustomer = createCustomer;
// export const sendVerificationToken = async (request, response) => {
//   const { data } = request.body
//   return await customerService.sendVerificationToken({ ...data });
//   // if (isSuccess) {
//   //   return sendSuccess({ response });
//   // }
//   // return sendError({ response, code: HttpStatusCode.SERVER_ERROR });
// };
//# sourceMappingURL=customerController.js.map