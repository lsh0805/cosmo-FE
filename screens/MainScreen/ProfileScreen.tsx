import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Instagram from "../../assets/images/Instagram_logo.svg";
import Facebook from "../../assets/images/facebook_logo.svg";
import { Button } from "../../components";
import { MainStackParamList } from "../../navigation_stack/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

let icon = require("../../assets/images/icon.png");

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
          <View style={styles.top_left_container}>
            <Avatar.Image size={100} source={icon} />
            <View style={styles.external_SNS_container}>
              <View style={styles.SNS_item}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("../../assets/images/facebook_logo.png")}
                />
                <Text style={styles.external_SNS_Id}>@id</Text>
              </View>
              <View style={styles.SNS_item}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("../../assets/images/instagram_logo.png")}
                />
                <Text style={styles.external_SNS_Id}>@so0ng__</Text>
              </View>
            </View>
          </View>
          <View style={styles.top_right_container}>
            <View style={styles.top_right_userInfo}>
              <Text style={styles.username}>이름</Text>
              <Text style={styles.bio}>Bio...</Text>
            </View>
          </View>
          <View>
            <Button
              mode="contained"
              contentStyle={{ padding: 0, borderRadius: 2 }}
              labelStyle={{
                fontSize: 14,
                marginVertical: 5,
                marginHorizontal: 5,
                borderRadius: 2,
              }}
              style={{ borderRadius: 7, marginVertical: 0 }}
              onPress={() => {}}
            >
              친구 요청
            </Button>
          </View>
        </View>

        <View style={styles.reputation_container}>
          <Text>소개</Text>
          <Text>어쩌구 저쩌구</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#000",
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 25,
    justifyContent: "center",
    alignContent: "center",
  },
  contents_container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    gap: 12,
  },
  top_container: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  top_left_container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  external_SNS_container: {
    gap: 15,  
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  SNS_item: { flexDirection: "row" },
  external_SNS_Id: {
    marginLeft: 6,
    fontSize: 15,
    textAlign: "center",
    color: "#fff",
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
  },
  username: {
    fontSize: 14,
    color: "#fff",
  },
  top_right_btn: {},
  bio_container: {
    gap: 15,
  },
  bio: {
    fontWeight: "regular",
    fontSize: 14,
    color: "#fff",
  },

  reputation_container: {
    flex: 1,
    fontSize: 18,
  },
});
