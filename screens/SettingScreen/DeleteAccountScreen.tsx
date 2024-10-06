import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button as PaperButton,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";
import { Button, TextInput } from "../../components";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";

type DeleteAccountProps = NativeStackScreenProps<
  SettingStackParamList,
  "DeleteAccount"
>;

export default function DeleteAccountScreen({
  navigation,
}: DeleteAccountProps) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.layout}>
      <View style={styles.section_container}>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>보안 설정</Text>
            <Text style={styles.section_description}>
              계정 탈퇴 전 본인 확인을 위해 계정의 비밀번호를 입력해주세요.
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput placeholder="계정 비밀번호" value={""} error={false} />
          </View>
        </View>
      </View>
      <Button
        label="계정 탈퇴하기"
        style={{ marginBottom: 30, backgroundColor: "#f20" }}
        onPress={() => showDialog()}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>계정 탈퇴</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {
                "정말로 계정을 탈퇴하시겠습니까?\n탈퇴 후에는 계정을 복구할 수 없습니다."
              }
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: "row" }}>
            <PaperButton
              onPress={hideDialog}
              style={{
                borderRadius: 0,
              }}
              labelStyle={{
                fontSize: 14,
                paddingHorizontal: 20,
              }}
            >
              네
            </PaperButton>
            <PaperButton
              onPress={hideDialog}
              style={{
                borderRadius: 0,
              }}
              labelStyle={{
                fontSize: 14,
                color: "#f20",
                fontFamily: "NotoSansKR700",
              }}
            >
              아니오
            </PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  section_header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 7,
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
  section: {},
});
