import mailgun from "mailgun-js";
const API_KEY = 'ec97422f9a6aab7ac15ad474ec3ba542-90346a2d-032b6265';
const DOMAIN =
  'sandbox455465d101ea46bab58a06820fda4409.mailgun.org';
const mg = mailgun({
  apiKey: API_KEY,
  domain: DOMAIN,
});

const sendEmail = (
  to: string,
  from: string,
  subject: string,
  text: string,
) => {
  let data = {
    to,
    from,
    subject,
    text,
  };
return mg.messages().send(data, function (error, body) {
    if (error) {
      return error
    }
    console.log('BODY=---+', body);
  });
};
export { sendEmail };
