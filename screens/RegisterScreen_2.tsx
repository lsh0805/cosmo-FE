import { Platform, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../App";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton, TextInput } from "react-native-paper";
import { useState } from "react";
import { Text } from "../components/Text";
import Button from "../components/Button";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register_2"
>;

const CELL_COUNT = 6;

export default function RegisterScreen_2({
  navigation,
}: RegisterScreenProps): React.JSX.Element {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
            <Text style={styles.title}>인증 코드 입력</Text>
            <Text style={styles.description}>
              SMS를 통해 전송된 인증 코드를 입력해주세요. 만약 인증 코드가
              도착하지 않았다면 재전송을 클릭하여 재발급 받을 수 있습니다.
            </Text>
          </View>
          <View style={styles.center_container}>
            <View style={styles.center_row_1}>
              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                InputComponent={TextInput}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete={
                  Platform.select({
                    android: "sms-otp",
                    default: "one-time-code",
                  }) as "sms-otp" | "off" | "email" | "password"
                }
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
            <View>
              <Button mode="contained" buttonColor="#aa7dff" textColor="#fff">
                인증 코드 재전송
              </Button>
            </View>
          </View>
          <View style={styles.bottom_container}>
            <Button
              mode="contained"
              onPress={() => {
                navigation.navigate("Register_3");
              }}
              buttonColor="#aa7dff"
              textColor="#fff"
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
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
