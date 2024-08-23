import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../App";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import RegisterContext from "../../contexts/RegisterProvider";

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register_3"
>;

export default function RegisterScreen_3({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [password, setPassword] = useState("");
  const [passwordDup, setPasswordDup] = useState("");
  const { registerData, setRegisterData } = useContext(RegisterContext);

  const onPasswordChange = (value: string) => {
    setPassword(value);
    setRegisterData({ ...registerData, password: value });
  };

  const onPasswordDupChange = (value: string) => {
    setPasswordDup(value);
  };

  return (
    <RegisterLayout
      title={"비밀번호 설정"}
      description={
        "계정 로그인에 사용할 비밀번호를 입력해주세요. 계정의 보안을 위해 강력한 비밀번호를 설정할 것을 권고합니다."
      }
      navigation={navigation}
    >
      <View style={styles.center_container}>
        <View style={styles.center_row_1}>
          <TextInput
            label="비밀번호"
            returnKeyType="next"
            value={password}
            onChangeText={onPasswordChange}
            error={false}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
            keyboardType="default"
          />
        </View>
        <View style={styles.center_row_2}>
          <TextInput
            label="비밀번호 재입력"
            returnKeyType="next"
            value={passwordDup}
            onChangeText={onPasswordDupChange}
            error={false}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
            keyboardType="default"
          />
        </View>
        <View style={styles.center_row_3}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("Register_4");
            }}
          >
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
  bottom_container: {
    display: "flex",
    flexGrow: 2,
  },
});
