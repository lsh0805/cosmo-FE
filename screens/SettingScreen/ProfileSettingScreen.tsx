import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";
import { StyleSheet, View } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";
import { Button, TextInput } from "../../components";

let profile_img = require("../../assets/images/profile_image.png");

type ProfileSettingProps = NativeStackScreenProps<
  SettingStackParamList,
  "ProfileSetting"
>;

export default function ProfileSettingScreen({
  navigation,
}: ProfileSettingProps) {
  return (
    <View style={styles.layout}>
      <View style={styles.section_container}>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>프로필 사진</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Avatar.Image size={130} source={profile_img} />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Button
                style={{ width: "40%" }}
                mode="contained"
                buttonColor="#06a"
              >
                변경하기
              </Button>
              <Button
                style={{ width: "40%" }}
                mode="contained"
                buttonColor="#d20"
              >
                삭제하기
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>사용자 이름</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="사용자 이름"
              value={"username"}
              error={false}
              disabled={true}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>프로필 메시지</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="사용자 이름"
              value={"username"}
              style={{ height: 200 }}
              error={false}
              disabled={true}
              multiline={true}
            />
          </View>
        </View>
      </View>
      <Button textColor="#fff" buttonColor="#00f">
        저장하기
      </Button>
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
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  section_title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
