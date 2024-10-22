import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import MatchingItem from "../../components/MatchingItem";
import { Button } from "../../components";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MatchingScreen(): React.JSX.Element {
  return (
    <View style={styles.layout}>
      <Button
        style={{
          marginVertical: 20,
          paddingVertical: 10,
          backgroundColor: "#111",
        }}
        icon={<FontAwesome5 size={24} name="plus" color="#fff" />}
        mode="contained"
        contentType="icon"
        onPress={() => {}}
      />
      <View style={styles.item_container}>
        <MatchingItem
          keyword="아침"
          status="PROGRESS"
          createdAt={new Date()}
          anonymous={true}
          onRemove={() => {}}
        />
        <MatchingItem
          keyword="햇살"
          status="PROGRESS"
          createdAt={new Date()}
          anonymous={true}
          onRemove={() => {}}
        />
        <MatchingItem
          keyword="새벽"
          status="PROGRESS"
          createdAt={new Date()}
          anonymous={true}
          onRemove={() => {}}
        />
        <MatchingItem
          keyword="이슬"
          status="COMPLETED"
          createdAt={new Date()}
          anonymous={true}
          onRemove={() => {}}
        />
        <MatchingItem
          keyword="꽃"
          status="EXPIRED"
          createdAt={new Date()}
          anonymous={true}
          onRemove={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#000",
    flex: 1,
    paddingHorizontal: 15,
  },
  item_container: {
    gap: 12,
  },
});
