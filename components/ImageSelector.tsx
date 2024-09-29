import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "./Text";
import { Button } from "react-native-paper";

let profile_img = require("../assets/images/profile_image.png");

const ImageSelector = () => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
  };

  return (
    <View style={styles.layout}>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={profile_img}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.btn_container}>
          <Button
            contentStyle={styles.btn}
            mode="outlined"
            onPress={() => {
              console.log("Pressed");
            }}
            icon={() => <AntDesign name="picture" size={20} color="#fff" />}
          >
            <View style={styles.centerElement}>
              <Text>저장 공간에서 불러오기</Text>
            </View>
          </Button>
        </View>
        <View>
          <Button
            contentStyle={styles.btn}
            mode="outlined"
            textColor="#fa0"
            onPress={() => {
              console.log("Pressed");
            }}
            icon={() => (
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={20}
                style={{ alignSelf: "flex-start" }}
                color="#fff"
              />
            )}
          >
            프로필 사진 초기화
          </Button>
        </View>
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
  footer: { flex: 1, justifyContent: "flex-end" },
  btn_container: { flexDirection: "row" },
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
