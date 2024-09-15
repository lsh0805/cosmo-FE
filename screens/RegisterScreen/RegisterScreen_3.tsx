import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import RegisterContext from "../../contexts/RegisterProvider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RegisterStackParamList } from "../../navigation_stack/RegisterStack";
import { useIsFocused } from "@react-navigation/native";
import { restApiUrl } from "../../utility/api";
import axios from "axios";

type RegisterScreenProps = NativeStackScreenProps<
  RegisterStackParamList,
  "Register_3"
>;

type ErrorType = {
  occur: boolean;
  message: string;
};

export default function RegisterScreen_3({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [password, setPassword] = useState("");
  const [passwordDup, setPasswordDup] = useState("");
  const [passwordError, setPasswordError] = useState<ErrorType>({
    occur: false,
    message: "",
  });
  const [passwordDupError, setPasswordDupError] = useState<ErrorType>({
    occur: false,
    message: "",
  });
  const { registerData, setRegisterData } = useContext(RegisterContext);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState<boolean>(false);

  const listener = (e: any) => {
    e.preventDefault();
    navigation.removeListener("beforeRemove", listener);
    navigation.navigate("Register_1");
  };

  useEffect(() => {
    if (isFocused) navigation.addListener("beforeRemove", listener);
    return () => {
      navigation.removeListener("beforeRemove", listener);
    };
  }, [isFocused, navigation]);

  const onPasswordChange = (value: string) => {
    setPasswordError({ occur: false, message: "" });
    setPasswordDupError({ occur: false, message: "" });
    setPassword(value);
  };

  const onPasswordDupChange = (value: string) => {
    setPasswordDupError({ occur: false, message: "" });
    setPasswordDup(value);
  };

  const onPressNextButton = async () => {
    try {
      const response = await axios.post(restApiUrl.checkPassword, {
        password: password,
        passwordDup: passwordDup,
      });
      const data = response.data;
      const success = data.success;
      if (success) {
        setRegisterData({ ...registerData, password: password });
        navigation.navigate("Register_4");
      } else {
        setPasswordError(data.passwordError);
        setPasswordDupError(data.passwordDupError);
      }
    } catch (error) {
      console.log("error occur: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterLayout
      title={"비밀번호 설정"}
      description={
        "계정 로그인에 사용할 비밀번호를 입력해주세요. 계정의 보안을 위해 영문자와 숫자 그리고 특수문자를 포함하여 8자 이상으로 설정해야 합니다."
      }
      navigation={navigation}
    >
      <View style={styles.center_container}>
        <TextInput
          label="비밀번호"
          returnKeyType="next"
          value={password}
          onChangeText={onPasswordChange}
          error={passwordError.occur}
          errorText={passwordError.message}
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry={true}
          keyboardType="default"
        />
        <TextInput
          label="비밀번호 재입력"
          returnKeyType="next"
          value={passwordDup}
          onChangeText={onPasswordDupChange}
          error={passwordDupError.occur}
          errorText={passwordDupError.message}
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry={true}
          keyboardType="default"
        />
        <Button mode="contained" onPress={onPressNextButton}>
          다음
        </Button>
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
    flexGrow: 6,
  },
  bottom_container: {
    display: "flex",
    flexGrow: 2,
  },
});
