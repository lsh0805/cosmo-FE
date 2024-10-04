import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import RegisterContext from "../../contexts/RegisterProvider";
import { RegisterStackParamList } from "../../navigation_stack/RegisterStack";
import axios from "axios";
import {
  CheckUserIdErrors,
  CheckUserNameErrors,
  responseError,
  restApiUrl,
} from "../../utility/api";
import { storage_keys } from "../../utility/storage";

type RegisterScreenProps = NativeStackScreenProps<
  RegisterStackParamList,
  "Register_4"
>;

interface InputState {
  userId: string;
  userName: string;
  userIdError: CheckUserIdErrors | undefined;
  userNameError: CheckUserNameErrors | undefined;
  loading: boolean;
}

export default function RegisterScreen_4({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [state, setState] = useState<InputState>({
    userId: "",
    userName: "",
    userIdError: undefined,
    userNameError: undefined,
    loading: false,
  });
  const { registerData, setRegisterData } = useContext(RegisterContext);

  const onUserIdChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      userId: value,
      userIdError: undefined,
    }));
  };

  const onUserNameChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      userName: value,
      userNameError: undefined,
    }));
  };

  const signUp = async () => {
    try {
      const response = await axios.post(restApiUrl.signUp, {
        jwt: await SecureStore.getItemAsync(storage_keys.VerificationToken),
        email: registerData.userEmail,
        userId: state.userId,
        userName: state.userName,
        password: registerData.password,
      });

      const success = response.data.success;
      console.log(success);
      if (success) {
        navigation.navigate("MainStack", { screen: "Profile" });
      }
    } catch (error) {
      console.log("error occur: ", error);
    }
  };

  const onPressNextButton = async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const response = await axios.post(restApiUrl.checkUserIdAndUserName, {
        userId: state.userId,
        userName: state.userName,
      });

      const { success, userIdError, userNameError } = response.data;
      console.log(response.data);
      if (success) {
        setRegisterData({
          ...registerData,
          userId: state.userId,
          userName: state.userName,
        });
        signUp();
      } else {
        setRegisterData({
          ...registerData,
        });
        setState((prevState) => ({ ...prevState, userIdError, userNameError }));
      }
    } catch (error) {
      console.log("error occur: ", error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const getErrorMessage = (
    error: CheckUserIdErrors | CheckUserNameErrors | undefined
  ) => {
    switch (error) {
      case responseError.checkUserId.INVALID_USER_ID: {
        return "계정 아이디는 2 ~ 16자 사이의 영문자와 숫자만 사용 가능합니다.";
      }
      case responseError.checkUserId.ALREADY_USED_USER_ID: {
        return "해당 아이디는 이미 다른 사용자가 사용 중입니다.";
      }
      case responseError.checkUserName.INVALID_USER_NAME: {
        return "계정 이름은 특수문자를 제외한 1 ~ 16자 사이의 문자만 사용 가능합니다.";
      }
      default:
        return "";
    }
  };

  return (
    <RegisterLayout
      title={"계정 정보 설정"}
      description={
        "당신의 아이디와 이름을 입력해주세요. 아이디와 이름은 다른 사용자에게 공개됩니다. 아이디는 다른 사용자와 중복될 수 없습니다."
      }
      navigation={navigation}
    >
      <View style={styles.center_container}>
        <View style={styles.center_row_1}>
          <TextInput
            label="계정 아이디"
            returnKeyType="next"
            value={state.userId}
            onChangeText={onUserIdChange}
            error={state.userIdError !== undefined}
            errorText={getErrorMessage(state.userIdError)}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        <View style={styles.center_row_2}>
          <TextInput
            label="계정 이름"
            returnKeyType="next"
            value={state.userName}
            onChangeText={onUserNameChange}
            error={state.userNameError !== undefined}
            errorText={getErrorMessage(state.userNameError)}
            autoCapitalize="none"
            textContentType="nickname"
            keyboardType="default"
          />
        </View>
        <View style={styles.center_row_3}>
          <Button
            label="가입하기"
            loading={state.loading}
            mode="contained"
            onPress={onPressNextButton}
          />
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
    flexGrow: 6,
  },
  center_row_1: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  center_row_2: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  center_row_3: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
});
