import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
    setState({ ...state, userId: value, userIdError: undefined });
  };

  const onUserNameChange = (value: string) => {
    setState({ ...state, userName: value, userNameError: undefined });
  };

  const onPressNextButton = async () => {
    try {
      setState({ ...state, loading: true });
      const response = await axios.post(restApiUrl.checkUserIdAndUserName, {
        userId: state.userId,
        userName: state.userName,
      });

      const success =
        response.data.userId.success && response.data.userName.success;
      if (success) {
        setRegisterData({
          ...registerData,
          userId: state.userId,
          userName: state.userName,
        });
        navigation.navigate("Main", { screen: "Profile" });
      } else {
        setRegisterData({
          ...registerData,
          userId: response.data.userId.error,
          userName: response.data.userName.error,
        });
      }
    } catch (error) {
      console.log("error occur: ", error);
    } finally {
      setState({ ...state, loading: false });
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
        "당신의 아이디와 이름을 입력해주세요. 아이디와 이름은 다른 유저에게 공개됩니다. 아이디는 다른 사용자와 중복될 수 없습니다."
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
            errorText={getErrorMessage(state.userIdError)}
            autoCapitalize="none"
            textContentType="nickname"
            keyboardType="default"
          />
        </View>
        <View style={styles.center_row_3}>
          <Button
            loading={state.loading}
            mode="contained"
            onPress={onPressNextButton}
          >
            가입하기
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
