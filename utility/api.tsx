import Constants from "expo-constants";

export const getApiBaseUrl = (): string => {
  const env = __DEV__ ? "development" : "production";
  return Constants.expoConfig?.extra?.apiBaseUrl[env];
};

export const restApiUrl = {
  sendVerificationCode: getApiBaseUrl() + "/send-verification-code",
  checkVerificationCode: getApiBaseUrl() + "/check-verification-code",
  checkUserEmail: getApiBaseUrl() + "/check-user-email",
  checkUserId: getApiBaseUrl() + "/check-user-id",
  checkUserName: getApiBaseUrl() + "/check-user-name",
  checkUserIdAndName: getApiBaseUrl() + "/check-user-id-and-name",
  checkPassword: getApiBaseUrl() + "/check-password",
  getProfile: getApiBaseUrl() + "/get-profile",
};
