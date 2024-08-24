import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { TextInput } from "react-native-paper";
import { RegisterLayout } from "../../components";
import Button from "../../components/Button";
import { Text } from "../../components/Text";
import { theme } from "../../core/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RegisterStackParamList } from "../../navigation_stack/RegisterStack";

type RegisterScreenProps = NativeStackScreenProps<
  RegisterStackParamList,
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
    <RegisterLayout
      title={"인증 코드 입력"}
      description={"SMS를 통해 전송된 인증 코드를 입력해주세요."}
      navigation={navigation}
    >
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
        <View style={styles.center_row_2}>
          <Text style={{ fontSize: 16, color: "#fff" }}>
            인증코드가 도착하지 않았나요?
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.primary,
              marginLeft: 10,
            }}
            onPressIn={() => {}}
          >
            재전송
          </Text>
        </View>
        <View style={styles.center_row_3}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("Register_3");
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
    justifyContent: "center",
    marginTop: 20,
  },
  center_row_2: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "#fff",
    marginTop: 20,
  },
  center_row_3: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  codeFieldRoot: {
    display: "flex",
    flex: 1,
    alignContent: "center",
    justifyContent: "space-between",
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 44,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#888",
    backgroundColor: theme.colors.secondary,
    textAlign: "center",
    borderRadius: 4,
    color: "#fff",
  },
  focusCell: {
    borderColor: theme.colors.primary,
  },
});
