import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import * as Application from "expo-application";
import { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { TextInput } from "react-native-paper";
import { RegisterLayout, TextButton } from "../../components";
import Button from "../../components/Button";
import { Text } from "../../components/Text";
import RegisterContext from "../../contexts/RegisterProvider";
import { theme } from "../../core/theme";
import { RegisterStackParamList } from "../../navigation_stack/RegisterStack";
import { formattedTime, restApiUrl } from "../../utility/utility";

type RegisterScreenProps = NativeStackScreenProps<
  RegisterStackParamList,
  "Register_2"
>;

const CELL_COUNT = 6;

function useCountdownTimer(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  return timeLeft;
}

export default function RegisterScreen_2({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [value, setValue] = useState("");
  const [invalidCode, setInvalidCode] = useState<boolean>(false);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const timeLeft = useCountdownTimer(180);
  const { registerData, setRegisterData } = useContext(RegisterContext);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [canRequestSMS, setCanRequestSMS] = useState<boolean>(true);

  useEffect(() => {
    let id: string | null = "null";

    const fetchDeviceId = async () => {
      if (Platform.OS === "android") {
        id = Application.getAndroidId();
      } else if (Platform.OS === "ios") {
        id = await Application.getIosIdForVendorAsync();
      } else {
        // Unknown device.
        id = "null";
      }
      setDeviceId(id);
    };

    fetchDeviceId();
  }, []);

  const onPressNextButton = () => {
    let passedVerification = false;

    let incorrectCount = 3;
    if (passedVerification) navigation.navigate("Register_3");
    else {
      setIncorrectCount(incorrectCount);
      setInvalidCode(true);
    }
  };

  const onCodeCellChange = (value: string) => {
    setInvalidCode(false);
    setValue(value);
  };

  const requestSMSCode = async (deviceId: string) => {
    if (deviceId && canRequestSMS) {
      try {
        const response = await axios.post(restApiUrl.sendVerificationCode, {
          deviceId: deviceId,
          email: registerData.userEmail,
        });

        if (response.data.success) {
        } else if (response.data.error === "limit_exceeded") {
          console.log("Error", "You have exceeded the SMS request limit.");
          setCanRequestSMS(false);
        }
      } catch (error) {
        console.error("Failed to request SMS code:", error);
      }
    } else if (!canRequestSMS) {
      console.log("Error", "SMS request limit reached.");
    }
  };

  const verificationCodeInputStatus = () => {
    if (timeLeft == 0) {
      return (
        <Text style={styles.invalid_code}>
          인증 코드 입력 시간이 초과되었습니다. {"\n"}인증 코드 재전송을 눌러
          인증 코드를 새로 발급해주세요.
        </Text>
      );
    }
    if (incorrectCount >= 3) {
      return (
        <Text style={styles.invalid_code}>
          입력 시도 횟수를 초과하였습니다. 인증 코드를 새로 발급해주세요.
        </Text>
      );
    }
    if (invalidCode) {
      return (
        <Text style={styles.invalid_code}>
          잘못된 인증 코드입니다. 다시 입력해주세요. {"\n"}남은 시도 횟수: (
          {incorrectCount} / 3)
        </Text>
      );
    }
    return null;
  };

  return (
    <RegisterLayout
      title={"인증 코드 입력"}
      description={"이메일로 전송받은 인증 코드를 시간내에 입력해주세요."}
      navigation={navigation}
    >
      <View style={styles.center_container}>
        <View style={styles.remain_time_container}>
          <MaterialCommunityIcons
            style={styles.remain_time_icon}
            name="timer-outline"
            size={18}
          />
          <Text style={styles.remain_time}>{formattedTime(timeLeft)}</Text>
        </View>
        <View style={styles.center_row_1}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
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
                  (timeLeft == 0 || invalidCode) && styles.errorCell,
                  isFocused && styles.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View style={styles.invalid_code_container}>
          {verificationCodeInputStatus()}
        </View>
        <View style={styles.center_row_2}>
          <TextButton
            mode="text"
            onPressIn={() => {}}
            compact={true}
            style={{ width: "auto" }}
          >
            인증 코드 재전송
          </TextButton>
        </View>
        <View style={styles.center_row_3}>
          <Button mode="contained" onPress={onPressNextButton}>
            다음
          </Button>
        </View>
      </View>
    </RegisterLayout>
  );
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
  center_row_1: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  invalid_code_container: {
    marginTop: 20,
  },
  invalid_code: {
    color: theme.colors.error,
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "GothicA1",
    fontWeight: "bold",
    textAlign: "center",
  },
  center_row_2: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  center_row_3: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  codeFieldRoot: {
    display: "flex",
    flex: 1,
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
