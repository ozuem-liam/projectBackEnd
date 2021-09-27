import crypto from 'crypto';
import appConfig from '../configs/config';

export const encrypt = (text: string) => {
  const ivLength = 16,
    iv = crypto.randomBytes(ivLength),
    cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(appConfig.encryptionKey || ''),
      iv,
    );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':tp' + encrypted.toString('hex');
};

export const decrypt = (text: string) => {
  try {
    const textParts: any = text.split(':tp'),
      iv = Buffer.from(textParts.shift(), 'hex'),
      encryptedText = Buffer.from(textParts.join(':tp'), 'hex'),
      decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(appConfig.encryptionKey || ''),
        iv,
      );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    return false;
  }
};
