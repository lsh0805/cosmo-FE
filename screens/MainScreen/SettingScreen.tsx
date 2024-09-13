import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { MainStackParamList } from "../../navigation_stack/MainStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider, Text } from "react-native-paper";
import { Button } from "../../components";
import SettingItemButton from "../../components/SettingItemButton";

type SettingProps = NativeStackScreenProps<MainStackParamList, "Setting">;

export default function SettingScreen({
  navigation,
}: SettingProps): React.JSX.Element {
  useEffect(() => {
    navigation;
  }, []);

  return (
    <View style={styles.layout}>
      <View>
        <View style={styles.section}>
          <View>
            <Text style={styles.section_title}>사용자</Text>
          </View>
          <View>
            <SettingItemButton
              btn_icon={"account-circle-outline"}
              label={"프로필 설정"}
              children={null}
            />
            <SettingItemButton
              btn_icon={"account-multiple"}
              label={"친구 관리"}
              children={null}
            />
            <SettingItemButton
              btn_icon={"account-lock-outline"}
              label={"계정 설정"}
              children={null}
            />
          </View>
        </View>
        <Divider style={{ backgroundColor: "#666" }} />
        <View style={styles.section}>
          <View>
            <Text style={styles.section_title}>시스템</Text>
          </View>
          <View>
            <SettingItemButton
              btn_icon={"theme-light-dark"}
              label={"테마"}
              children={null}
            />
            <SettingItemButton
              btn_icon={"bell-outline"}
              label={"알림"}
              children={null}
            />
            <SettingItemButton
              btn_icon={"earth"}
              label={"언어"}
              children={null}
            />
          </View>
        </View>
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
});
