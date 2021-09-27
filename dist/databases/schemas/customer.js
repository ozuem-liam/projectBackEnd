"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCustomerSchema = exports.customer = void 0;
exports.customer = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        last_name: { type: 'string' },
        first_name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        address: { type: 'string' },
        state: { type: 'string' },
        email_confirm: { type: 'boolean' },
        phone_number: { type: 'number' },
        payment_type: { type: 'string' },
    },
};
exports.postCustomerSchema = {
    schema: {
        body: {
            type: 'object',
            required: [
                'last_name',
                'first_name',
                'email',
                'password',
                'address',
                'state',
                'phone_number',
                'payment_type',
            ],
            properties: {
                id: { type: 'string' },
                last_name: { type: 'string' },
                first_name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                address: { type: 'string' },
                state: { type: 'string' },
                email_confirm: { type: 'boolean' },
                phone_number: { type: 'number' },
                payment_type: { type: 'string' },
            },
            reponse: {
                201: exports.customer,
            },
        },
    },
};
//# sourceMappingURL=customer.js.map