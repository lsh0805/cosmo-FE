import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View, TouchableHighlight, ColorValue } from "react-native";
import { Button, Text, TextInput } from "../../../components";
import { SettingStackParamList } from "../../../navigation_stack/SettingStack";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListDialog from "../../../components/ListDialog";

type ProfileNameEditProps = NativeStackScreenProps<
  SettingStackParamList,
  "ProfileNameEdit"
>;

export default function ProfileImageEditScreen({
  navigation,
}: ProfileNameEditProps) {
  const [state, setState] = useState<string>("");
  return (
    <View style={styles.layout}>
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>사용자 이름</Text>
          <Text style={styles.description}>1 ~ 20자 사이 입력 가능</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="사용자 이름"
            value={state}
            onChangeText={(value) => setState(value)}
            error={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    display: "flex",
    paddingHorizontal: 10,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  section: {},
  header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 7,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "bold",
  },
});
