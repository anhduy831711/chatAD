import { AES, HmacSHA512, enc, SHA256 } from 'crypto-js';

const secret = process.env.APP_SECRET || 'app';
/**
 * The Production APP_SECRET if leaked with the salt will compromise all accounts
 */
export const scrypto = {
    sha512(str: string, secret?: string) {
        const localSecret = secret || process.env.APP_SECRET || 'app';
        return HmacSHA512(str, localSecret).toString();
    },
    sha256(str: string, secret?: string) {
        const localSecret = secret || process.env.SSO_SECRET || 'SSO_SECRET';
        let hash = SHA256(str, secret);
        return hash.toString(enc.Hex);
    },
    encrypt(str: string) {
        return AES.encrypt(AES.encrypt(str, secret).toString(), secret + '_x').toString();
    },
    decrypt(str: string) {
        return AES.decrypt(AES.decrypt(str, secret + '_x').toString(enc.Utf8), secret).toString(enc.Utf8);
    }
};
