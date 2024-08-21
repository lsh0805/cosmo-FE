import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../App";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register_1"
>;

export default function RegisterScreen_1({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <RegisterLayout
      title={"휴대폰 번호 등록"}
      description={
        "계정 로그인에 사용할 휴대폰 번호를 입력해주세요. 입력한 휴대폰 번호로 SMS를 통해 인증 코드가 전송됩니다. 휴대폰 번호는 다른 사용자에게 공개되지 않습니다."
      }
      navigation={navigation}
    >
      <View style={styles.container}>
        <View style={styles.center_row_1}>
          <TextInput
            label="휴대폰 번호"
            returnKeyType="next"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={false}
            autoCapitalize="none"
            textContentType="telephoneNumber"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.center_row_1}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Register_2")}
            textColor="#fff"
          >
            다음
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
