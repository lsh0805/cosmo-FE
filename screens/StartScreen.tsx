import { StyleSheet, View } from "react-native";
import { useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { Text } from "../components/Text";
import { useState } from "react";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../App";
import Cosmo from "../assets/images/logo.svg";

type StartScreenProps = NativeStackScreenProps<RootStackParamList, "Start">;

export default function StartScreen({
  navigation,
}: StartScreenProps): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <LinearGradient
      colors={["#020d36", "#000005", "#020d36"]}
      start={[0, 0]}
      end={[1, 1]}
      style={[styles.background, { width: width, height: height }]}
    >
      <View style={styles.layout}>
        <View
          style={[
            styles.container,
            { width: width * 0.8, height: height * 0.8 },
          ]}
        >
          <View style={[styles.top_container, { width: "100%" }]}>
            <Cosmo width={50} height={50} />
            <Text
              style={[
                styles.app_name,
                {
                  color: "#fff",
                },
              ]}
            >
              cosmo
            </Text>
          </View>
          <View style={[styles.auth_container, { width: "100%" }]}>
            <TextInput
              label="휴대폰 번호"
              returnKeyType="next"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              error={false}
              errorText=""
              autoCapitalize="none"
              textContentType="telephoneNumber"
              keyboardType="number-pad"
              textColor="#fff"
              outlineColor="#fff"
              activeOutlineColor="#d98cff"
            />
            <TextInput
              label="비밀번호"
              returnKeyType="next"
              value={password}
              onChangeText={setPassword}
              error={false}
              errorText=""
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
              keyboardType="default"
              textColor="#fff"
              outlineColor="#fff"
              activeOutlineColor="#d98cff"
            />
            <Button
              mode="contained"
              onPress={() => {}}
              buttonColor="#00aae4"
              textColor="#fff"
            >
              로그인
            </Button>
          </View>
          <View style={(styles.bottom_container, { width: "100%" })}>
            <Button
              mode="outlined"
              textColor="#fff"
              style={[{ borderColor: "#fff", borderWidth: 3 }]}
              onPress={() => {}}
            >
              가입하기
            </Button>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
  },
  container: {
    display: "flex",
    backgroundColor: "none",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  top_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  logo: {
    flex: 0,
  },
  app_name: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  auth_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    marginVertical: 20,
    backgroundColor: "#ff65c9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
  },
});
