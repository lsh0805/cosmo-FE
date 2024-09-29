import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { ImageSelector } from "../../components";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";

let profile_img = require("../../assets/images/profile_image.png");

type ProfileImageEditProps = NativeStackScreenProps<
  SettingStackParamList,
  "ProfileImageEdit"
>;

export default function ProfileImageEditScreen({
  navigation,
}: ProfileImageEditProps) {
  return (
    <View style={styles.layout}>
      <ImageSelector />
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
});
