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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = exports.loginUser = void 0;
const client_1 = __importDefault(require("../interfaces/client"));
const messages_json_1 = __importDefault(require("../translation/messages.json"));
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const sharedService = __importStar(require("./appService"));
const EMAIL_CONFIRM = 'EmailConfirmation';
const PASSWORD_RESET = 'PasswordReset';
dayjs_1.default.extend(duration_1.default);
const loginUser = async ({ email, password, }) => {
    const customer = await client_1.default.customer.findUnique({
        where: { email: email },
    });
    const hashPassword = customer.password;
    const isMatch = await sharedService.isAMatchPassword(password, hashPassword);
    if (isMatch) {
        let destination = 'dashboard', message = messages_json_1.default['ACT-LOGIN-SUCCESS'], isSuccess = true;
        const data = { last_login: Date.now().toString() };
        //save customer to DB
        client_1.default.customer.update({ where: { email: email }, data });
        return { isSuccess, customer, destination, message };
    }
    else {
        let message = messages_json_1.default['ACT-INVALID-LOGIN'];
        return { isSuccess: false, message };
    }
};
exports.loginUser = loginUser;
const createCustomer = async ({ email, password, payment_type, first_name, last_name, address, state, email_confirm, phone_number, stage, id, }) => {
    try {
        let message = '', destination = 'verification';
        if (stage === 1) {
            const exist = await client_1.default.customer.findUnique({
                where: { email: email },
            });
            if (exist) {
                const message = messages_json_1.default['ACT-EMAIL-EXIST'];
                return { isSuccess: false, message };
            }
            const hashPassword = await sharedService.hashPassword(password);
            const customer = await client_1.default.customer.create({
                data: {
                    email,
                    first_name,
                    last_name,
                    address,
                    state,
                    email_confirm,
                    phone_number,
                    payment_type: payment_type.cash,
                    password: hashPassword,
                },
            });
            return {
                isSuccess: true,
                message,
                customer: { id: customer.id },
                destination: 'email confirmation',
            };
        }
        else if (stage === 2) {
            const customer = await client_1.default.customer.findUnique({
                where: {
                    id: id,
                },
            });
            if ((customer === null || customer === void 0 ? void 0 : customer.email_confirm) == false) {
                message = messages_json_1.default['USER-NOT-FOUND'];
                return { isSuccess: false, message };
            }
            else if ((customer === null || customer === void 0 ? void 0 : customer.email_confirm) == true) {
                await (0, exports.loginUser)({ email, password });
                destination = 'dashboard';
                message = messages_json_1.default['ACT-LOGIN-SUCCESS'];
                return {
                    isSuccess: true,
                    destination,
                    message,
                    customer: formatCustomerResponse(customer),
                };
            }
            message = messages_json_1.default['WRONG-CONFIRM-CODE'];
            return { isSuccess: false, message, destination };
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.createCustomer = createCustomer;
function formatCustomerResponse(customer) {
    const { id, email, first_name, last_name, email_confirm, payment_type, phone_number, } = customer;
    return {
        id,
        email,
        first_name,
        last_name,
        email_confirm,
        payment_type,
        phone_number,
    };
}
// export const sendVerificationToken = async ({
//   email,
//   first_name,
//   type,
// }): Promise<{
//       isSuccess: boolean;
//       message?: string;
//       token?: string;
//       email?: string;
//     }
//   | undefined
// > => {
//   try {
//     if (!email || !first_name) {
//       // res.status(400).send({error: true, msg: "Informations are missing"});
//       let message = 'Informations are missing';
//       let isSuccess = false;
//       return { isSuccess, message };
//     }
//     let customer = await prisma.customer.findUnique({
//       where: { email },
//     });
//     if (!customer) {
//       let message = 'Customer does not exist';
//       let isSuccess = false;
//       return { isSuccess, message };
//     } else if (type == EMAIL_CONFIRM) {
//     // generate token
//     const token = await generateToken(customer);
//     // send Confirm Email
//     sharedService.sendEmail({
//       to: customer.email,
//       from: appConfig.mailGun.sender,
//       subject: 'Email Confirmation',
//       text: `Welcome ${first_name}, please click the link to confirm your email. <a href="http://localhost:5000/customer/confirm_email/${token}"> </a>`,
//     });
//       let isSuccess = true;
//       return { isSuccess, token, email };
//     }
//   } catch (error) {
//     throw error;
//   }
// };
//# sourceMappingURL=customerService.js.map