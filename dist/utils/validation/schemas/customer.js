"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSchemas = exports.emailSchema = exports.confirmPasswordSchema = exports.passwordSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const messages_json_1 = __importDefault(require("../../../translation/messages.json"));
exports.passwordSchema = joi_1.default.string()
    .min(6)
    .regex(/^(?:(?=.*\d)(?=.*[A-Z]).*)$/)
    .trim()
    .label('Password')
    .messages({
    'string.pattern.base': messages_json_1.default['ACT-PASSWORD-NOT-STRONG'],
    'string.min': messages_json_1.default['ACT-PASSWORD-NOT-STRONG'],
    'any.required': messages_json_1.default['ACT-PASSWORD-REQUIRED'],
});
exports.confirmPasswordSchema = joi_1.default.string()
    .valid(joi_1.default.ref('password'))
    .trim()
    .label('Confirm password')
    .messages({
    'any.only': messages_json_1.default['ACT-CONFIRM-PASSWORD-MATCH'],
    'any.required': messages_json_1.default['ACT-CONFIRM-PASSWORD-REQUIRED'],
}), exports.emailSchema = joi_1.default.string().required().email().trim().label('Email').messages({
    'string.email': messages_json_1.default['ACT-EMAIL-INVALID'],
    'any.required': messages_json_1.default['ACT-EMAIL-REQUIRED'],
});
exports.customerSchemas = {
    registrationSchema: joi_1.default.object().keys({
        first_name: joi_1.default.string()
            .trim(true)
            .required()
            .regex(/^[A-Za-z]/)
            .label('First name')
            .messages({
            'any.required': messages_json_1.default['ACT-FIRSTNAME-REQUIRED'],
        }),
        last_name: joi_1.default.string()
            .trim(true)
            .required()
            .regex(/^[A-Za-z]/)
            .label('Last name')
            .messages({
            'any.required': messages_json_1.default['ACT-LASTNAME-REQUIRED'],
        }),
        state: joi_1.default.string()
            .trim(true)
            .required()
            .regex(/^[A-Za-z]/)
            .label('Last name')
            .messages({
            'any.required': messages_json_1.default['ACT-LASTNAME-REQUIRED'],
        }),
        address: joi_1.default.string()
            .trim(true)
            .required()
            .regex(/^[A-Za-z]/)
            .label('Last name')
            .messages({
            'any.required': messages_json_1.default['ACT-LASTNAME-REQUIRED'],
        }),
        phone_number: joi_1.default.number().label('Phone number'),
        email: exports.emailSchema,
        password: exports.passwordSchema.required(),
        confirm_password: exports.confirmPasswordSchema.required(),
        stage: joi_1.default.number().integer().positive().default(1).required().valid(1, 2).label('Stage'),
        payment_type: joi_1.default.string().required().valid('Card', 'Paypal', 'Cash').label('Payment type'),
        join_mailing_list: joi_1.default.boolean().default(false),
        token: joi_1.default.number().integer().positive().label('Token'),
    }),
    resetPasswordSchema: joi_1.default.object().keys({
        email: exports.emailSchema,
        token: joi_1.default.number().integer().positive().label('Token').required().messages({
            'any.required': messages_json_1.default['TOKEN-REQUIRED'],
        }),
        stage: joi_1.default.number().integer().positive().default(1).required().valid(1, 2).label('Stage'),
        password: joi_1.default.when('stage', {
            is: 2,
            then: exports.passwordSchema.required(),
        }),
        confirm_password: joi_1.default.when('stage', {
            is: 2,
            then: exports.confirmPasswordSchema.required(),
        }),
    }),
    loginSchema: joi_1.default.object().keys({
        email: exports.emailSchema,
        password: exports.passwordSchema.required(),
        otp: joi_1.default.number().min(6).max(6).label('OTP').messages({
            'any.min': messages_json_1.default['ACT-INVALID-2FA'],
        }),
    }),
    emailConfirmationSchema: joi_1.default.object().keys({
        email: exports.emailSchema,
        first_name: joi_1.default.string()
            .trim(true)
            .required()
            .regex(/^[A-Za-z]/)
            .label('First name')
            .messages({
            'any.required': messages_json_1.default['ACT-FIRSTNAME-REQUIRED'],
        }),
        last_name: joi_1.default.string()
            .trim(true)
            .regex(/^[A-Za-z]/)
            .label('Last name'),
        type: joi_1.default.string().required().valid('PasswordReset', 'EmailConfirmation').label('Type'),
    }),
    validateOptions: {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
    },
};
//# sourceMappingURL=customer.js.map