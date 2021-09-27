"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimit = exports.cookieOption = exports.corsOptions = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("./config"));
exports.corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', config_1.default.authName],
    credentials: true,
};
const sessionName = crypto_1.default.createHash('sha256').update('RRANESTA').digest('hex');
const expiresIn = new Date();
expiresIn.setHours(expiresIn.getHours() + 2); //2 hours
exports.cookieOption = {
    secret: config_1.default.appKey,
    parseOptions: {
        name: sessionName,
        resave: true,
        saveUninitialized: true,
        expires: expiresIn,
        secure: config_1.default.development ? false : true,
        sameSite: config_1.default.development ? 'Lax' : 'Strict',
    },
};
exports.rateLimit = {
    max: 50,
    timeWindow: '1 minute',
};
//# sourceMappingURL=app.js.map