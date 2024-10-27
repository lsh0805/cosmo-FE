import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View, TouchableHighlight, ColorValue } from "react-native";
import { Button } from "../../../components";
import { SettingStackParamList } from "../../../navigation_stack/SettingStack";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListDialog from "../../../components/ListDialog";

type ImageSelectDialogItemType = {
  text: string;
  color: ColorValue;
  id: string;
  onPress: () => void;
};

type ProfileImageEditProps = NativeStackScreenProps<
  SettingStackParamList,
  "ProfileImageEdit"
>;

export default function ProfileImageEditScreen({
  navigation,
}: ProfileImageEditProps) {
  const [image, setImage] = useState<string>(
    "../../assets/images/profile_image.png"
  );

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  let ImageSelectDialogItemList: ImageSelectDialogItemType[] = [
    {
      text: "저장공간에서 불러오기",
      color: "#0ae",
      id: "1",
      onPress: () => {
        uploadImage();
        hideDialog();
      },
    },
    {
      text: "프로필 사진 삭제",
      color: "#f30",
      id: "2",
      onPress: () => {
        removeImage();
        hideDialog();
      },
    },
  ];

  const changeImage = (image: string) => {
    setImage(image);
  };

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      changeImage(result.assets[0].uri);
    }
  };

  const removeImage = async () => {};

  return (
    <View style={styles.layout}>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={{ uri: image }}
          contentFit="cover"
          transition={1000}
        />
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="#0065ff"
          onPress={() => {
            showDialog();
          }}
          style={[styles.profile_img_edit]}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            color="#fff"
            size={30}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.footer}>
        <Button
          mode="outlined"
          contentType="left-icon-text"
          style={{ width: "100%", borderColor: "#0ae" }}
          onPress={() => {
            navigation.goBack();
            console.log("Pressed");
          }}
          icon={
            <MaterialCommunityIcons
              name="content-save"
              size={20}
              color="#0ae"
            />
          }
        >
          저장하고 돌아가기
        </Button>
        <Button
          mode="outlined"
          contentType="left-icon-text"
          style={{ width: "100%", borderColor: "#f30" }}
          onPress={() => {
            console.log("Pressed");
          }}
          icon={
            <MaterialCommunityIcons
              name="arrow-expand-left"
              size={20}
              color="#f30"
            />
          }
        >
          취소하고 돌아가기
        </Button>
      </View>
      <ListDialog
        data={ImageSelectDialogItemList}
        visible={visible}
        onDismiss={() => {
          hideDialog();
        }}
      />
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
  image_container: {
    width: 250,
    height: 250,
    position: "relative",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
  },
  image: {
    backgroundColor: "#222",
    borderRadius: 9999,
    width: "100%",
    height: "100%",
  },
  profile_img_edit: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    right: 8,
    bottom: 15,
  },
  footer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    rowGap: 20,
  },
});
