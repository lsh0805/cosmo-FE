import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import RegisterContext from "../../contexts/RegisterProvider";
import { RegisterStackParamList } from "../../navigation_stack/RegisterStack";
import axios from "axios";
import { restApiUrl } from "../../utility/api";

type RegisterScreenProps = NativeStackScreenProps<
  RegisterStackParamList,
  "Register_4"
>;

type ErrorType = {
  occur: boolean;
  message: string;
};

export default function RegisterScreen_4({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userIdError, setUserIdError] = useState<ErrorType>({
    occur: false,
    message: "",
  });
  const [userNameError, setUserNameError] = useState<ErrorType>({
    occur: false,
    message: "",
  });
  const { registerData, setRegisterData } = useContext(RegisterContext);

  const onUserIdChange = (value: string) => {
    setUserIdError({ occur: false, message: "" });
    setUserId(value);
  };

  const onUserNameChange = (value: string) => {
    setUserNameError({ occur: false, message: "" });
    setUserName(value);
  };

  const onPressNextButton = async () => {
    const userIdResponse = await axios.post(restApiUrl.checkUserId, {
      userId: userId,
    });
    const userNameResponse = await axios.post(restApiUrl.checkUserName, {
      userName: userName,
    });

    const success = userIdResponse.data.success && userNameResponse.data.sucess;
    if (success) {
      setRegisterData({ ...registerData, userId: userId, userName: userName });
      navigation.navigate("profile");
    } else {
      setUserIdError(userIdResponse.data.error);
      setUserNameError(userIdResponse.data.error);
    }
  };

  return (
    <RegisterLayout
      title={"계정 정보 설정"}
      description={
        "당신의 아이디와 이름을 입력해주세요. 아이디와 이름은 다른 유저에게 공개됩니다. 아이디는 다른 유저와 중복될 수 없습니다."
      }
      navigation={navigation}
    >
      <View style={styles.center_container}>
        <View style={styles.center_row_1}>
          <TextInput
            label="계정 아이디"
            returnKeyType="next"
            value={userId}
            onChangeText={onUserIdChange}
            error={userIdError.occur}
            errorText={userIdError.message}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        <View style={styles.center_row_2}>
          <TextInput
            label="계정 이름"
            returnKeyType="next"
            value={userName}
            onChangeText={onUserNameChange}
            error={userNameError.occur}
            errorText={userNameError.message}
            autoCapitalize="none"
            textContentType="nickname"
            keyboardType="default"
          />
        </View>
        <View style={styles.center_row_3}>
          <Button mode="contained" onPress={onPressNextButton}>
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
