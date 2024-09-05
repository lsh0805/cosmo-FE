import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Instagram from "../../assets/images/instagram_logo.svg";
import Facebook from "../../assets/images/facebook_logo.svg";
import { Button } from "../../components";

let icon = require("../../assets/images/icon.png");

export default function ProfileScreen(): React.JSX.Element {
  return (
    <View style={styles.layout}>
      <View style={styles.contents_container}>
        <View style={styles.top_container}>
          <View style={styles.top_left_container}>
            <Avatar.Image size={100} source={icon} />
          </View>
          <View style={styles.top_right_container}>
            <Text style={styles.username}>이름</Text>
            <Text style={styles.userId}>(@아이디)</Text>
            <View style={styles.top_right_btn}>
              <Button>친구 요청</Button>
              <Button>메시지 보내기</Button>
            </View>
          </View>
        </View>
        <View style={styles.bio_container}>
          <Text style={styles.bio_label}>소개</Text>
          <Text style={styles.bio}>소개 내용</Text>
        </View>
        <View style={styles.external_SNS_container}>
          <View style={styles.SNS_item}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/images/instagram_logo.png")}
            />
            <Text style={styles.external_SNS_Id}>(@id)</Text>
          </View>
          <View style={styles.SNS_item}>
            <Facebook width={20} height={20} />
            <Text style={styles.external_SNS_Id}>(@id)</Text>
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
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 40,
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
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    justifyContent: "space-between",
  },
  top_left_container: {
    flex: 1,
    display: "flex",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  top_right_container: {
    flexDirection: "column",
    flex: 2,
  },
  username: {
    fontSize: 18,
  },
  userId: {
    fontSize: 18,
  },
  bio_container: {
    borderRadius: 5,
    backgroundColor: "#eee",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  bio_label: {
    fontWeight: "bold",
    fontSize: 18,
  },
  bio: {
    fontWeight: "regular",
    fontSize: 18,
  },
  external_SNS_container: {
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: "#eee",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  SNS_item: { flexDirection: "row" },
  external_SNS_Id: { fontSize: 15 },
  reputation_container: {
    flex: 1,
    fontSize: 18,
  },
});
