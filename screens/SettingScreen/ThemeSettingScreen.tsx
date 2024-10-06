import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button as PaperButton,
  Dialog,
  Portal,
  RadioButton,
  Text,
} from "react-native-paper";
import { Button, TextInput } from "../../components";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";

type ThemeSettingProps = NativeStackScreenProps<
  SettingStackParamList,
  "ThemeSetting"
>;

export default function ThemeSettingScreen({ navigation }: ThemeSettingProps) {
  const [selectedTheme, setSelectedTheme] = React.useState("device");

  return (
    <View style={styles.layout}>
      <View style={styles.section_container}>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>테마 설정</Text>
            <Text style={styles.section_description}>
              Cosmo의 앱 테마를 설정해주세요.
            </Text>
          </View>
          <RadioButton.Group
            onValueChange={(theme) => setSelectedTheme(theme)}
            value={selectedTheme}
          >
            <RadioButton.Item
              value="light"
              label="밝은 테마"
              labelStyle={styles.item_label}
              status={selectedTheme === "light" ? "checked" : "unchecked"}
            />
            <RadioButton.Item
              value="dark"
              label="어두운 테마"
              labelStyle={styles.item_label}
              status={selectedTheme === "dark" ? "checked" : "unchecked"}
            />
            <RadioButton.Item
              value="device"
              label="기기 설정값"
              labelStyle={styles.item_label}
              status={selectedTheme === "device" ? "checked" : "unchecked"}
            />
          </RadioButton.Group>
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
  item_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item_label: {
    color: "#fff",
    fontSize: 17,
  },
});
