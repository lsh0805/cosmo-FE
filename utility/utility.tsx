import { Buffer } from "buffer";

export const checkIsValidEmailAddress = (emailAddress: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailAddress);
};

export const formattedTime = (seconds: number): string => {
  const minute: number = Math.floor(seconds / 60);
  const remain_seconds: number = seconds % 60;
  const f_minute = minute < 10 ? "0" + minute.toString() : minute.toString();
  const f_seconds =
    remain_seconds < 10
      ? "0" + remain_seconds.toString()
      : remain_seconds.toString();
  const f_time = f_minute + ":" + f_seconds;
  return f_time;
};

export const decodeJWT = (encodedJWT: string) => {
  return JSON.parse(Buffer.from(encodedJWT.split(".")[1], "base64").toString());
};
