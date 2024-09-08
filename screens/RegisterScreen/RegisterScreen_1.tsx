import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import RegisterContext from "../../contexts/RegisterProvider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RegisterStackParamList } from "../../navigation_stack/RegisterStack";
import { checkIsValidEmailAddress } from "../../utility/utility";

type RegisterScreenProps = NativeStackScreenProps<
  RegisterStackParamList,
  "Register_1"
>;

export default function RegisterScreen_1({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { registerData, setRegisterData } = useContext(RegisterContext);

  const onEmailInputChange = (value: string) => {
    setEmail(value);
    if (error) setError(false);
  };

  const onPressNextButton = () => {
    if (checkIsValidEmailAddress(email) === false) {
      setError(true);
      return;
    }
    setRegisterData({ ...registerData, userEmail: email });
    navigation.navigate("Register_2");
  };

  return (
    <RegisterLayout
      title={"이메일 등록"}
      description={
        "계정 로그인에 사용할 이메일을 입력해주세요. 입력한 이메일로 인증 코드가 전송됩니다. 이메일 주소는 다른 사용자에게 공개되지 않습니다."
      }
      navigation={navigation}
    >
      <View style={styles.container}>
        <View style={styles.center_row_1}>
          <TextInput
            label="이메일"
            returnKeyType="next"
            value={email}
            onChangeText={onEmailInputChange}
            error={error}
            errorText="이메일 주소를 확인해주세요."
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.center_row_1}>
          <Button mode="contained" onPress={onPressNextButton} textColor="#fff">
            인증 코드 발송
          </Button>
        </View>
      </View>
    </RegisterLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  center_row_1: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  center_row_2: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
});
