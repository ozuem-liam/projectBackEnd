"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    serverPort: process.env.PORT || 8080,
    database: {
        endPoint: process.env.DB_URL,
    },
    encryptionKey: process.env.ENCRYPTION_KEY,
    mailGun: {
        apiKey: process.env.MAILGUN_KEY,
        url: process.env.MAILGUN_URL,
        sender: process.env.EMAIL_SENDER,
        password: process.env.EMAIL_PASS,
    },
    development: process.env.DEVELOPMENT,
    appKey: process.env.APP_KEY,
    jwtSecret: process.env.JWT_SECRET,
    authName: 'test',
    tokenLife: 1,
};
//# sourceMappingURL=config.js.map