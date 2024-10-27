import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import RegisterContext from "../../contexts/RegisterProvider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RegisterStackParamList } from "../../navigation_stack/RegisterStack";
import { checkIsValidEmailAddress } from "../../utility/utility";
import axios from "axios";
import { restApiUrl } from "../../utility/api";

type RegisterScreenProps = NativeStackScreenProps<
  RegisterStackParamList,
  "Register_1"
>;

export default function RegisterScreen_1({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { registerData, setRegisterData } = useContext(RegisterContext);

  const onEmailInputChange = (value: string) => {
    setEmail(value);
    if (error) setError(false);
  };

  const onPressNextButton = async () => {
    console.log(restApiUrl.checkEmail);
    if (checkIsValidEmailAddress(email) === false) {
      setError(true);
      return;
    } else {
      try {
        const response = await axios.post(restApiUrl.checkEmail, {
          email: email,
        });
        console.log(response);
        const success = response.data.success;
        if (success) {
          setRegisterData({ ...registerData, userEmail: email });
          navigation.navigate("Register_2");
        } else {
          setError(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
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
        <Button mode="contained" onPress={onPressNextButton}>
          인증 코드 발송
        </Button>
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
    rowGap: 22,
  },
});
