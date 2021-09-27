"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../configs/config"));
const encrypt = (text) => {
    const ivLength = 16, iv = crypto_1.default.randomBytes(ivLength), cipher = crypto_1.default.createCipheriv('aes-256-cbc', Buffer.from(config_1.default.encryptionKey || ''), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':tp' + encrypted.toString('hex');
};
exports.encrypt = encrypt;
const decrypt = (text) => {
    try {
        const textParts = text.split(':tp'), iv = Buffer.from(textParts.shift(), 'hex'), encryptedText = Buffer.from(textParts.join(':tp'), 'hex'), decipher = crypto_1.default.createDecipheriv('aes-256-cbc', Buffer.from(config_1.default.encryptionKey || ''), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    catch (error) {
        return false;
    }
};
exports.decrypt = decrypt;
//# sourceMappingURL=encryption.js.map