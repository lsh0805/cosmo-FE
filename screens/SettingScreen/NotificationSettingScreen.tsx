import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button as PaperButton,
  Dialog,
  Portal,
  RadioButton,
  Switch,
  Text,
} from "react-native-paper";
import { Button, TextInput } from "../../components";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";

type NottificationSettingProps = NativeStackScreenProps<
  SettingStackParamList,
  "NotificationSetting"
>;

export default function NotificationSettingScreen({
  navigation,
}: NottificationSettingProps) {
  const [selectedTheme, setSelectedTheme] = React.useState("device");

  return (
    <View style={styles.layout}>
      <View style={styles.section_container}>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>알림 설정</Text>
          </View>
          <View>
            <Text>친구 요청 알림</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
          </View>
        </View>
      </View>
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
