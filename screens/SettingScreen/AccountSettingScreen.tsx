import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button as PaperButton,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";
import { MenuItem } from "../../components";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";

type AccountSettingProps = NativeStackScreenProps<
  SettingStackParamList,
  "AccountSetting"
>;

export default function AccountSettingScreen({
  navigation,
}: AccountSettingProps) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.layout}>
      <View style={styles.section_container}>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>보안 설정</Text>
          </View>
          <MenuItem
            icon={<MaterialIcons name="password" size={28} color="#fff" />}
            label="비밀번호 변경"
            onPress={() => navigation.navigate("PasswordReset")}
          />
          <MenuItem
            icon={<MaterialIcons name="logout" size={28} color="#0af" />}
            label="로그아웃"
            labelStyle={{ color: "#0af" }}
            onPress={() => showDialog()}
          />
          <MenuItem
            icon={<AntDesign name="deleteuser" size={28} color="#f20" />}
            label="계정 탈퇴"
            labelStyle={{ color: "#f20" }}
            onPress={() => navigation.navigate("DeleteAccount")}
          />
        </View>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>로그아웃</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {"계정 로그아웃을 진행하시겠습니까?"}
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
  section: {},
});
