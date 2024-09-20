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
  checkUserIdAndUserName: getApiBaseUrl() + "/check-userId-and-userName",
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
  checkPassword: {
    INVALID_PASSWORD: "INVALID_PASSWORD",
  },
  checkPasswordDup: {
    INVALID_PASSWORD_DUP: "INVALID_PASSWORD",
    NOT_SAME_PASSWORD: "NOT_SAME_PASSWORD",
  },
  checkUserId: {
    INVALID_USER_ID: "INVALID_USER_ID",
    ALREADY_USED_USER_ID: "ALREADY_USED_USER_ID",
  },
  checkUserName: {
    INVALID_USER_NAME: "INVALID_USER_NAME",
  },
};

export type CheckVerificationCodeErrors =
  (typeof responseError.checkVerificationCode)[keyof typeof responseError.checkVerificationCode];

export type GetVerificationCodeErrors =
  (typeof responseError.getVerificationCode)[keyof typeof responseError.getVerificationCode];

export type VerificationErrors =
  | CheckVerificationCodeErrors
  | GetVerificationCodeErrors
  | undefined;

export type CheckPasswordErrors =
  (typeof responseError.checkPassword)[keyof typeof responseError.checkPassword];

export type CheckPasswordDupErrors =
  (typeof responseError.checkPasswordDup)[keyof typeof responseError.checkPasswordDup];

export type CheckUserIdErrors =
  (typeof responseError.checkUserId)[keyof typeof responseError.checkUserId];

export type CheckUserNameErrors =
  (typeof responseError.checkUserName)[keyof typeof responseError.checkUserName];
