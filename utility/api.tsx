import Constants from "expo-constants";

export const getApiBaseUrl = (): string => {
  const env = __DEV__ ? "development" : "production";
  return Constants.expoConfig?.extra?.apiBaseUrl[env];
};

export const restApiUrl = {
  getVerificationCode: getApiBaseUrl() + "/get-verification-code",
  checkEmail: getApiBaseUrl() + "/check-email",
  checkVerificationCode: getApiBaseUrl() + "/check-verification-code",
  checkUserId: getApiBaseUrl() + "/check-user-id",
  checkUserName: getApiBaseUrl() + "/check-user-name",
  checkUserIdAndName: getApiBaseUrl() + "/check-user-id-and-name",
  checkPassword: getApiBaseUrl() + "/check-password",
};

export const responseError = {
  getVerificationCode: {
    EXCEEDED_MAXIMUM_REQUEST_COUNT: "EXCEEDED_MAXIMUM_REQUEST_COUNT",
  },
  checkVerificationCode: {
    NOT_FOUND_UUID: "NOT_FOUND_UUID",
    INCOMPLETE_CODE: "INCOMPLETE_CODE",
    EXPIRED_VERIFICATION_CODE: "EXPIRED_VERIFICATION_CODE",
    EXCEEDED_MAXIMUM_CHECK_COUNT: "EXCEEDED_MAXIMUM_CHECK_COUNT",
    INCORRECT_CODE: "INCORRECT_CODE",
    ALREADY_USED_EMAIL: "ALREADY_USED_EMAIL",
  },
};

type CheckVerificationCodeErrors =
  (typeof responseError.checkVerificationCode)[keyof typeof responseError.checkVerificationCode];

type GetVerificationCodeErrors =
  (typeof responseError.getVerificationCode)[keyof typeof responseError.getVerificationCode];

export type VerificationErrors =
  | CheckVerificationCodeErrors
  | GetVerificationCodeErrors
  | undefined;
