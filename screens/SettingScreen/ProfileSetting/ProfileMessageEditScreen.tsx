import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View, TouchableHighlight, ColorValue } from "react-native";
import { Button, Text, TextInput } from "../../../components";
import { SettingStackParamList } from "../../../navigation_stack/SettingStack";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListDialog from "../../../components/ListDialog";

type ProfileMessageEditProps = NativeStackScreenProps<
  SettingStackParamList,
  "ProfileMessageEdit"
>;

export default function ProfileImageEditScreen({
  navigation,
}: ProfileMessageEditProps) {
  const [state, setState] = useState<string>("");
  return (
    <View style={styles.layout}>
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>프로필 메시지</Text>
          <Text style={styles.description}>0 ~ 100자 사이 입력 가능</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="프로필 메시지"
            value={state}
            onChangeText={(value) => setState(value)}
            style={{ height: 200 }}
            onPress={() => navigation.navigate("ProfileMessageEdit")}
            error={false}
            multiline={true}
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
