"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// import appConfig from '../configs/config';
// const API_KEY = appConfig.mailGun.apiKey;
// const DOMAIN = appConfig.mailGun.url;
const API_KEY = 'ec97422f9a6aab7ac15ad474ec3ba542-90346a2d-032b6265';
const DOMAIN = 'https://api.mailgun.net/v3/sandbox455465d101ea46bab58a06820fda4409.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });
const sendEmail = (to, from, subject, text) => {
    let data = {
        to: to,
        from: from,
        subject: subject,
        text: text,
    };
    return mailgun.messages().send(data, (error, body) => {
        if (error) {
            console.log("ERROR=_----", error);
        }
        console.log("BODY=---+", body);
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=EmailClient.js.map