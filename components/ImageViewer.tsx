import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

let profile_img = require("../assets/images/profile_image.png");

const ImageViewer = () => {
  return (
    <View style={styles.layout}>
      <Image
        style={styles.image}
        source="profile_img"
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});

export default ImageViewer;
