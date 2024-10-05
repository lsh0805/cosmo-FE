import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { TextInput } from "react-native-paper";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import { Text } from "../../components/Text";
import RegisterContext from "../../contexts/RegisterProvider";
import { theme } from "../../core/theme";
import { RegisterStackParamList } from "../../navigation_stack/RegisterStack";
import {
  responseError,
  restApiUrl,
  VerificationErrors,
} from "../../utility/api";
import { storage_keys } from "../../utility/storage";
import { decodeJWT } from "../../utility/utility";

type RegisterScreenProps = NativeStackScreenProps<
  RegisterStackParamList,
  "Register_2"
>;

interface VerificationState {
  value: string;
  error: VerificationErrors;
  resend: boolean;
  incorrectCount: number;
}

const CELL_COUNT = 6;

export default function RegisterScreen_2({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      value: "",
      error: undefined,
      resend: false,
      incorrectCount: 0,
    }
  );
  const ref = useBlurOnFulfill({
    value: verificationState.value,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationState.value,
    setValue: (text) =>
      setVerificationState({ ...verificationState, value: text }),
  });
  const { registerData, setRegisterData } = useContext(RegisterContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    requestAuthCode();
  }, []);

  const onPressRequestButton = () => {
    setVerificationState({
      value: "",
      error: undefined,
      incorrectCount: 0,
      resend: true,
    });
    requestAuthCode();
  };

  const onPressNextButton = async () => {
    // 인증 코드를 완전히 입력하지 않았을 경우
    if (verificationState.value.length < CELL_COUNT) {
      setVerificationState((prevState) => ({
        ...prevState,
        error: responseError.checkVerificationCode.INCOMPLETE_CODE,
      }));
      return;
    }

    // 인증 코드를 발급 받았을 때 함께 받은 uuid를 가져옴
    const uuid = await SecureStore.getItemAsync(storage_keys.VerificationId);

    // 기기에 UUID가 저장되어있지 않을 경우
    if (uuid === null) {
      setVerificationState((prevState) => ({
        ...verificationState,
        error: responseError.checkVerificationCode.NOT_FOUND_UUID,
      }));
      return;
    }

    try {
      // 서버로 입력한 인증 코드와 uuid를 전송하여 인증 처리를 진행
      setLoading(true);
      const response = await axios.post(restApiUrl.checkVerificationCode, {
        code: verificationState.value,
        uuid: uuid,
      });
      const { success, count, jwt } = response.data;

      // 인증에 성공하였을 경우
      if (success) {
        console.log(decodeJWT(jwt));
        await SecureStore.setItemAsync(storage_keys.VerificationToken, jwt);
        navigation.navigate("Register_3");
      }
      // 인증에 실패하였을 경우
      else {
        const error: VerificationErrors = response.data.error;
        setVerificationState((prevState) => ({
          ...prevState,
          incorrectCount: count,
          error: error,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onCodeCellChange = (value: string) => {
    setVerificationState((prevState) => ({
      ...prevState,
      error: undefined,
      value: value,
      resend: false,
    }));
  };

  const requestAuthCode = async () => {
    if (
      verificationState.error ===
      responseError.getVerificationCode.EXCEEDED_MAXIMUM_REQUEST_COUNT
    ) {
      console.log("Error", "Request limit reached.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(restApiUrl.getVerificationCode, {
        email: registerData.userEmail,
      });

      const { success, uuid, error } = response.data;
      if (success) {
        await SecureStore.setItemAsync(storage_keys.VerificationId, uuid);
      } else if (
        error ===
        responseError.getVerificationCode.EXCEEDED_MAXIMUM_REQUEST_COUNT
      ) {
        setVerificationState((prevState) => ({
          ...prevState,
          error:
            responseError.getVerificationCode.EXCEEDED_MAXIMUM_REQUEST_COUNT,
        }));
        console.log("Error", "You have exceeded the request limit.");
      }
    } catch (error) {
      console.error("Failed to request auth code:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVerificationErrorMessage = (error: VerificationErrors) => {
    switch (error) {
      case responseError.checkVerificationCode.INCOMPLETE_CODE: {
        return "6자의 인증 코드를 입력해주세요.";
      }
      case responseError.checkVerificationCode.EXPIRED_VERIFICATION_CODE: {
        return "인증 코드가 만료되었습니다. \n인증 코드 재전송을 눌러 인증 코드를 새로 발급해주세요.";
      }
      case responseError.checkVerificationCode.EXCEEDED_MAXIMUM_CHECK_COUNT: {
        return "입력 시도 횟수를 초과하였습니다. 인증 코드 재전송을 눌러 인증 코드를 새로 발급해주세요.";
      }
      case responseError.checkVerificationCode.ALREADY_USED_EMAIL: {
        return "이미 사용중인 이메일입니다.";
      }
      case responseError.checkVerificationCode.INCORRECT_CODE: {
        return (
          "잘못된 인증 코드입니다. 다시 입력해주세요. \n남은 시도 횟수: " +
          `${3 - verificationState.incorrectCount}`
        );
      }
      default: {
        return null;
      }
    }
  };

  const getStatusMessage = () => {
    if (verificationState.error !== undefined) {
      return (
        <Text style={[styles.status, { color: theme.colors.error }]}>
          {getVerificationErrorMessage(verificationState.error)}
        </Text>
      );
    } else if (verificationState.resend) {
      return (
        <Text style={[styles.status, { color: theme.colors.primary }]}>
          인증 코드가 재발송 되었습니다.
        </Text>
      );
    } else {
      return null;
    }
  };

  const normalView = () => {
    return (
      <RegisterLayout
        title={"인증 코드 입력"}
        description={
          "이메일" +
          `(${registerData.userEmail})` +
          "로 전송받은 인증 코드를 시간내에 입력해주세요."
        }
        navigation={navigation}
      >
        <View style={styles.center_container}>
          <CodeField
            ref={ref}
            {...props}
            value={verificationState.value}
            InputComponent={TextInput}
            onChangeText={onCodeCellChange}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={
              Platform.select({
                android: "sms-otp",
                default: "one-time-code",
              }) as "sms-otp" | "off" | "email" | "password"
            }
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  verificationState.error !== undefined && styles.errorCell,
                  isFocused && styles.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {getStatusMessage()}
          <Button
            mode="outlined"
            onPress={onPressRequestButton}
            label="인증 코드 재전송"
          />
          <Button
            label="다음"
            loading={loading}
            mode="contained"
            onPress={onPressNextButton}
          />
        </View>
      </RegisterLayout>
    );
  };

  const requestLimitExeededView = () => {
    return (
      <RegisterLayout
        title={"인증 코드 입력"}
        description={
          "일일 인증 코드 요청 횟수가 초과되었습니다. 24시간 뒤에 다시 시도해주세요."
        }
        navigation={navigation}
      >
        <Button
          label="돌아가기"
          loading={loading}
          mode="contained"
          onPress={() => {
            navigation.navigate("Start");
          }}
        />
      </RegisterLayout>
    );
  };

  return verificationState.error !==
    responseError.getVerificationCode.EXCEEDED_MAXIMUM_REQUEST_COUNT
    ? normalView()
    : requestLimitExeededView();
}

const styles = StyleSheet.create({
  center_container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    flex: 6,
  },
  remain_time_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  remain_time_icon: {
    alignSelf: "center",
    color: "#FFF",
  },
  remain_time: {
    color: "#FFF",
    marginLeft: 6,
    fontSize: 24,
  },
  invalid_code_container: {
    marginTop: 20,
  },
  status: {
    color: theme.colors.error,
    fontSize: 14,
    lineHeight: 24,
    marginTop: 20,
    fontFamily: "GothicA1400",
    fontWeight: "bold",
    textAlign: "center",
  },
  codeFieldRoot: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
  },
  cell: {
    width: 52,
    height: 52,
    alignSelf: "center",
    lineHeight: 52,
    fontSize: 24,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: theme.colors.secondary,
    textAlign: "center",
    borderRadius: 4,
    color: "#fff",
  },
  focusCell: {
    borderColor: theme.colors.primary,
  },
  errorCell: {
    borderColor: theme.colors.error,
  },
});
