import * as messages from './messages.json';

export default function translate(key: any, property: any): Promise<{message: string}> {
  let message: any = messages[key];
  for (const prop in property) {
    message = message.replace(`[${prop}]`, property[prop]);
  }
  return message;
}