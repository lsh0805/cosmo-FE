import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Button, TextInput } from "../../components";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";

type PasswordResetProps = NativeStackScreenProps<
  SettingStackParamList,
  "PasswordReset"
>;

export default function PasswordResetScreen({
  navigation,
}: PasswordResetProps) {
  return (
    <View style={styles.layout}>
      <View style={styles.section_container}>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>현재 비밀번호</Text>
            <Text style={styles.section_description}>
              현재 계정의 비밀번호를 입력해주세요.
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput placeholder="현재 비밀번호" value={""} error={false} />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>새로운 비밀번호</Text>
            <Text style={styles.section_description}>
              영문자, 숫자, 특수문자를 포함하여 10자 이상 입력해주세요.
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput placeholder="새 비밀번호" value={""} error={false} />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>새로운 비밀번호 확인</Text>
            <Text style={styles.section_description}>
              비밀번호 확인을 위해 위와 동일하게 한 번 더 입력해주세요.
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="새 비밀번호 확인"
              value={""}
              error={false}
            />
          </View>
        </View>
      </View>
      <Button
        label="비밀번호 변경하기"
        style={{ marginBottom: 30, backgroundColor: "#00f" }}
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  section_container: {
    rowGap: 16,
  },
  section: {},
  section_header: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  section_title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  section_description: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "bold",
  },
  profile_img_edit: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    position: "absolute",
    backgroundColor: "#007bff",
    right: -8,
    bottom: -12,
    alignItems: "center",
    justifyContent: "center",
  },
});
