import Constants from "expo-constants";

export const getApiBaseUrl = (): string => {
  const env = __DEV__ ? "development" : "production";
  return Constants.expoConfig?.extra?.apiBaseUrl[env];
};

export const restApiUrl = {
  sendVerificationCode: getApiBaseUrl() + "/send-verification-code",
};

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
