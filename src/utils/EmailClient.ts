import mailgun from "mailgun-js";
const API_KEY = 
const DOMAIN =
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
