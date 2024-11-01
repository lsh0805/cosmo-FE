import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
} from "react-native";
import { Avatar, Text } from "react-native-paper";
import { Button, TextInput } from "../../../components";
import { SettingStackParamList } from "../../../navigation_stack/SettingStack";
import Toast from "react-native-root-toast";

let profile_img = require("../../../assets/images/profile_image.png");

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
  const [state, setState] = useState<{
    profile_image: string;
    username: string;
    profile_message: string;
  }>({
    profile_image: "",
    username: "",
    profile_message: "",
  });
  // const uploadProfileImage = async (image: string) => {
  //   const body = new FormData();
  //   let file = {
  //     uri: image.uri,
  //     type: mime.getType(image.uri), // image/jpeg
  //     name: image.name,
  //   };
  //   body.append("images", file);

  //   if (TOKEN === undefined);
  //   {
  //     TOKEN = await getToken();
  //   }

  //   axios.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer ${TOKEN.accessToken}`;

  //   axios
  //     .post(`서버에 저장할 URL`, body, {
  //       headers: {
  //         "Content-Type": `multipart/form-data`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("사진보내기 응답");
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log("사진보내기 에러");
  //       console.log(err.response);
  //     });
  // };

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
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="사용자 이름"
              value={state.username}
              onPress={() => navigation.navigate("ProfileNameEdit")}
              error={false}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>프로필 메시지</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="프로필 메시지"
              value={state.profile_message}
              style={{ height: 200 }}
              onPress={() => navigation.navigate("ProfileMessageEdit")}
              error={false}
              multiline={true}
            />
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
