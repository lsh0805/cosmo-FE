import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { MainStackParamList } from "../../navigation_stack/MainStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider, Text } from "react-native-paper";
import { Button } from "../../components";
import SettingItemButton from "../../components/SettingItemButton";
import { TouchableOpacity } from "react-native-gesture-handler";

type SettingProps = NativeStackScreenProps<MainStackParamList, "Setting">;
type ItemType = {
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};
type SectionType = {
  header: string;
  items: ItemType[];
};
const sections: SectionType[] = [
  {
    header: "사용자",
    items: [
      {
        label: "프로필 설정",
        icon: "account-circle-outline",
      },
      {
        label: "친구 관리",
        icon: "account-multiple",
      },
      {
        label: "계정 설정",
        icon: "account-lock-outline",
      },
    ],
  },
  {
    header: "시스템",
    items: [
      {
        label: "테마",
        icon: "theme-light-dark",
      },
      {
        label: "알림",
        icon: "bell-outline",
      },
      {
        label: "언어",
        icon: "earth",
      },
    ],
  },
];

export default function SettingScreen({
  navigation,
}: SettingProps): React.JSX.Element {
  useEffect(() => {
    navigation;
  }, []);

  return (
    <View style={styles.layout}>
      <View>
        {sections.map(({ header, items }, index) => {
          return (
            <View>
              {index !== 0 ? (
                <Divider style={{ backgroundColor: "#666" }} />
              ) : undefined}
              <View style={styles.section}>
                <Text style={styles.section_title}>{header}</Text>
                {items.map(({ label, icon }) => {
                  return (
                    <TouchableHighlight
                      activeOpacity={0.8}
                      underlayColor="#222"
                      onPress={() => {}}
                    >
                      <View style={styles.btn_content}>
                        <MaterialCommunityIcons
                          name={icon}
                          color={"#fff"}
                          size={28}
                        />
                        <Text style={styles.btn_label}>{label}</Text>
                      </View>
                    </TouchableHighlight>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, color: "#999" }}>앱 버전 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginVertical: 12,
  },
  section_title: {
    marginLeft: 14,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  btn_content: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "center",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 12,
  },
  btn_label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
