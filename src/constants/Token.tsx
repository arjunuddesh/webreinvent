import CryptoJS from "crypto-js";
const SECRET_KEY = 'mysecretkey';
export const tokenEncryption = (token:any) => {
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(token),
        SECRET_KEY
    ).toString();

    return encrypted;
}
export const tokenDecryption = (token:any) => {
    const decrypted = CryptoJS.AES.decrypt(
        token, SECRET_KEY).toString(CryptoJS.enc.Utf8);

    return decrypted;
}