import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";

let profile_img = require("../../assets/images/profile_image.png");

type ProfileSettingProps = NativeStackScreenProps<
  SettingStackParamList,
  "ProfileSetting"
>;

export default function ProfileSettingScreen({
  navigation,
}: ProfileSettingProps) {
  return (
    <View>
      <Avatar.Image size={100} source={profile_img} />
    </View>
  );
}
