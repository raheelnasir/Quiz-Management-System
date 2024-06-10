import CryptoJS from 'crypto-js';

export function encryptObject(obj) {
    const key = "0027VIGO91ef46WALA21430c93c6JASON776ecbaf0229";
    const ciphertext = CryptoJS.AES.encrypt(obj, key).toString();
    return ciphertext;
}

export function decryptObject(ciphertext) {
    const key = "0027VIGO91ef46WALA21430c93c6JASON776ecbaf0229";
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}
