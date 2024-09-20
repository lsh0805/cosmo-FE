import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import RegisterContext from "../../contexts/RegisterProvider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RegisterStackParamList } from "../../navigation_stack/RegisterStack";
import { useIsFocused } from "@react-navigation/native";
import {
  CheckPasswordDupErrors,
  CheckPasswordErrors,
  responseError,
  restApiUrl,
} from "../../utility/api";
import axios from "axios";

type RegisterScreenProps = NativeStackScreenProps<
  RegisterStackParamList,
  "Register_3"
>;

interface InputState {
  password: string;
  passwordDup: string;
  passwordError: CheckPasswordErrors | undefined;
  passwordDupError: CheckPasswordDupErrors | undefined;
  loading: boolean;
}

export default function RegisterScreen_3({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [state, setState] = useState<InputState>({
    password: "",
    passwordDup: "",
    passwordError: undefined,
    passwordDupError: undefined,
    loading: false,
  });
  const { registerData, setRegisterData } = useContext(RegisterContext);
  const isFocused = useIsFocused();

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
    if (
      state.passwordDupError ===
      responseError.checkPasswordDup.NOT_SAME_PASSWORD
    ) {
      setState({
        ...state,
        passwordError: undefined,
        passwordDupError: undefined,
        password: value,
      });
    } else {
      setState({
        ...state,
        passwordError: undefined,
        password: value,
      });
    }
  };

  const onPasswordDupChange = (value: string) => {
    setState({
      ...state,
      passwordDupError: undefined,
      passwordDup: value,
    });
  };

  const onPressNextButton = async () => {
    try {
      const response = await axios.post(restApiUrl.checkPassword, {
        password: state.password,
        passwordDup: state.passwordDup,
      });
      const data = response.data;
      const success = data.success;
      if (success) {
        setRegisterData({ ...registerData, password: state.password });
        navigation.navigate("Register_4");
      } else {
        setState({
          ...state,
          passwordError: data.passwordError,
          passwordDupError: data.passwordDupError,
        });
      }
    } catch (error) {
      console.log("error occur: ", error);
    } finally {
      setState({ ...state, loading: false });
    }
  };

  const getErrorMessage = (
    error: CheckPasswordErrors | CheckPasswordDupErrors | undefined
  ) => {
    switch (error) {
      case responseError.checkPassword.INVALID_PASSWORD: {
        return "비밀번호는 최소 10자 이상이어야 하며, 영문자와 특수문자 그리고 숫자를 포함해야합니다.";
      }
      case responseError.checkPasswordDup.INVALID_PASSWORD_DUP: {
        return "비밀번호는 최소 10자 이상이어야 하며, 영문자와 특수문자 그리고 숫자를 포함해야합니다.";
      }
      case responseError.checkPasswordDup.NOT_SAME_PASSWORD: {
        return "입력한 비밀번호가 동일하지 않습니다.";
      }
      default:
        return "";
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
          value={state.password}
          onChangeText={onPasswordChange}
          error={state.passwordError !== undefined}
          errorText={getErrorMessage(state.passwordError)}
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry={true}
          keyboardType="default"
        />
        <TextInput
          label="비밀번호 재입력"
          returnKeyType="next"
          value={state.passwordDup}
          onChangeText={onPasswordDupChange}
          error={state.passwordDupError !== undefined}
          errorText={getErrorMessage(state.passwordDupError)}
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
