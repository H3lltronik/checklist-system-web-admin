import CryptoJS from 'crypto-js';

export class Encryptor {
    private key: CryptoJS.lib.WordArray;

    constructor(secret: string) {
        this.key = CryptoJS.enc.Utf8.parse(
            CryptoJS.SHA256(secret).toString(CryptoJS.enc.Hex).slice(0, 32),
        );
    }

    encrypt(plainText: string): { cipherText: string; iv: string } {
        const iv = CryptoJS.lib.WordArray.random(16);

        const cipherText = CryptoJS.AES.encrypt(plainText, this.key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        const encryptedData = cipherText.toString();

        return {
            cipherText: encryptedData,
            iv: CryptoJS.enc.Base64.stringify(iv),
        };
    }

    decrypt(cipherText: string, iv: string): string {
        const ivWordArray = CryptoJS.enc.Base64.parse(iv);

        const decrypted = CryptoJS.AES.decrypt(cipherText, this.key, {
            iv: ivWordArray,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        return decryptedText;
    }
}