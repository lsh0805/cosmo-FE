import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../App";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register_4"
>;

export default function RegisterScreen_4({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

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
            onChangeText={setUserId}
            error={false}
            errorText=""
            autoCapitalize="none"
            textContentType="telephoneNumber"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.center_row_2}>
          <TextInput
            label="계정 이름"
            returnKeyType="next"
            value={username}
            onChangeText={setUsername}
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
              navigation.navigate("Start");
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
});
