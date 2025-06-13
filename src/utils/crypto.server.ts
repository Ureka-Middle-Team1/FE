import CryptoJS from "crypto-js";

const secretKey = process.env.ENCRYPT_SECRET_KEY;

if (!secretKey) {
  throw new Error("ENCRYPT_SECRET_KEY 환경변수가 없습니다.");
}

export const encrypt = (text: string): string => {
  return encodeURIComponent(CryptoJS.AES.encrypt(text, secretKey).toString());
};

export const decrypt = (cipher: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipher, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
