import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { Button } from "../../components";
import { MainStackParamList } from "../../navigation_stack/MainStack";

let profile_img = require("../../assets/images/profile_image.png");

type ProfileScreenProps = NativeStackScreenProps<MainStackParamList, "Profile">;

export default function ProfileScreen({
  navigation,
}: ProfileScreenProps): React.JSX.Element {
  useEffect(() => {
    navigation;
  }, []);

  return (
    <View style={styles.layout}>
      <View style={styles.contents_container}>
        <View style={styles.top_container}>
          <Avatar.Image size={100} source={profile_img} />
          <View style={styles.top_right_userInfo}>
            <Text style={styles.username}>name</Text>
            <Text ellipsizeMode="head" style={styles.bio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              molestie non orci pretium semper. Sed maximus ac erat et
              elementum. Praesent et dolor convallis, lacinia felis id,
              dignissim nulla.
            </Text>
          </View>
        </View>
        <View style={styles.user_btn_container}>
          <Button
            icon="account-plus"
            mode="contained"
            buttonColor="#222"
            onPress={() => console.log("Pressed")}
          >
            친구 추가
          </Button>
        </View>
        <View style={styles.reputation_container}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#000",
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignContent: "center",
  },
  contents_container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#000",
    justifyContent: "space-around",
    gap: 12,
  },
  top_container: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 2,
  },
  top_left_container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  top_right_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 3,
    height: "100%",
    marginLeft: 30,
    marginVertical: 0,
  },
  top_right_userInfo: {
    flex: 1,
    marginLeft: 20,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  bio_container: {
    gap: 15,
  },
  bio: {
    fontWeight: "regular",
    fontSize: 14,
    color: "#fff",
  },
  user_btn_container: {
    display: "flex",
    flex: 1,
  },
  reputation_container: {
    flex: 7,
    fontSize: 18,
  },
});
