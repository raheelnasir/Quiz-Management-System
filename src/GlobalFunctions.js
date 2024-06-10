import CryptoJS from 'crypto-js';

export function encryptObject(obj) {
    const key = process.env.HashKey;
    const ciphertext = CryptoJS.AES.encrypt(obj, key).toString();
    return ciphertext;
}

export function decryptObject(ciphertext) {
    const key = process.env.HashKey;
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}
