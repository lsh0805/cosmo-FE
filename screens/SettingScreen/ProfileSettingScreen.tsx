import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Avatar, Text } from "react-native-paper";
import { Button, TextInput } from "../../components";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";
import Toast from "react-native-root-toast";

let profile_img = require("../../assets/images/profile_image.png");

type ProfileSettingProps = NativeStackScreenProps<
  SettingStackParamList,
  "ProfileSetting"
>;

// Add a Toast on screen.
const showSaveResultToast = () => {
  Toast.show("프로필 설정이 저장되었습니다.", {
    duration: Toast.durations.LONG,
    position: 70,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });
};

const onPressSaveButton = () => {
  showSaveResultToast();
};

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
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ position: "relative" }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log("Pressed");
                }}
              >
                <Avatar.Image size={130} source={profile_img} />
              </TouchableWithoutFeedback>
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor="#0065ff"
                onPress={() => {
                  navigation.navigate("ProfileImageEdit");
                }}
                style={styles.profile_img_edit}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  color="#fff"
                  size={30}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>사용자 이름</Text>
            <Text style={styles.section_description}>
              1 ~ 20자 사이 입력 가능
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="사용자 이름"
              value={"username"}
              error={false}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>프로필 메시지</Text>
            <Text style={styles.section_description}>
              0 ~ 100자 사이 입력 가능
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="사용자 이름"
              value={"username"}
              style={{ height: 200 }}
              error={false}
              multiline={true}
            />
          </View>
        </View>
      </View>
      <Button
        label="저장하기"
        style={{ marginBottom: 30, backgroundColor: "#00f" }}
        onPress={() => onPressSaveButton()}
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
