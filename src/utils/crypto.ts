import CryptoJS from "crypto-js";

const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY;

if (!secretKey) {
  throw new Error("NEXT_PUBLIC_ENCRYPT_SECRET_KEY 환경변수가 없습니다.");
}

export const encrypt = (text: string): string => {
  return encodeURIComponent(CryptoJS.AES.encrypt(text, secretKey).toString());
};

export const decrypt = (cipher: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(cipher), secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      console.warn("복호화 결과가 빈 문자열입니다. 키가 틀렸을 수 있음.");
    }
    return decrypted;
  } catch (err) {
    console.error("복호화 오류:", err);
    return "";
  }
};
