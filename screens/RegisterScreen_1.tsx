import { StyleSheet, View } from "react-native";
import TextInput from "../components/TextInput";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../App";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
import { useState } from "react";
import { Text } from "../components/Text";
import Button from "../components/Button";
type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register_1"
>;

export default function RegisterScreen_1({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <LinearGradient
      colors={["#7697a0", "#4a7075", "#7697a0"]}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1 }}
    >
      <View style={styles.layout}>
        <IconButton
          icon={"arrow-left"}
          size={20}
          animated={true}
          onPress={() => {
            navigation.navigate("Start");
          }}
          style={{ margin: 0 }}
        />
        <View style={styles.contents_container}>
          <View style={styles.top_container}>
            <Text style={styles.title}>휴대폰 번호 등록</Text>
            <Text style={styles.description}>
              계정 로그인에 사용할 휴대폰 번호를 입력해주세요. 입력한 휴대폰
              번호로 SMS를 통해 인증 코드가 전송됩니다. 휴대폰 번호는 다른
              유저에게 공개되지 않습니다.
            </Text>
          </View>
          <View style={styles.center_container}>
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
                textColor="#fff"
                outlineColor="#fff"
                activeOutlineColor="#d98cff"
              />
            </View>
          </View>
          <View style={styles.bottom_container}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Register_2")}
              buttonColor="#aa7dff"
              textColor="#fff"
              disabled={phoneNumber == ""}
            >
              다음
            </Button>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  layout: {
    padding: 20,
    flex: 1,
  },
  title: {
    height: 40,
    lineHeight: 40,
    fontSize: 30,
    color: "#fff",
  },
  description: {
    height: 50,
    lineHeight: 20,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    color: "#fff",
  },
  contents_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  top_container: {
    display: "flex",
    flexGrow: 2,
  },
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
  bottom_container: {
    display: "flex",
    flexGrow: 2,
  },
});
