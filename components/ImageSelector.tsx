import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

const ImageSelector = () => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState<string>(
    "../assets/images/profile_image.png"
  );

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
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.layout}>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={{ uri: image }}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View style={styles.footer}>
        <Button
          label="저장 공간에서 불러오기"
          mode="outlined"
          contentType="left-icon-text"
          style={{ borderColor: "#0ae" }}
          onPress={() => {
            uploadImage();
          }}
          icon={<AntDesign name="picture" size={20} color="#0ae" />}
        />
        <Button
          label="프로필 사진 초기화"
          mode="outlined"
          contentType="left-icon-text"
          style={{ borderColor: "#da0" }}
          onPress={() => {
            console.log("Pressed");
          }}
          icon={
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={20}
              color="#da0"
            />
          }
        />
      </View>
    </View>
  );
};

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
  footer: { flex: 1, justifyContent: "flex-end", width: "100%", rowGap: 30 },
  btn: {
    justifyContent: "space-between",
    alignContent: "center",
    gap: 50,
    padding: 0,
    marginHorizontal: 20,
  },
  centerElement: {
    flex: 1,
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "#fff",
    transform: [{ translateX: -50 }, { translateY: -50 }], // 정가운데 정렬
  },
});

export default ImageSelector;
