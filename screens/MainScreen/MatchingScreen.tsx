import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import MatchingItem from "../../components/MatchingItem";

export default function MatchingScreen(): React.JSX.Element {
  return (
    <View style={styles.layout}>
      <View style={styles.item_container}>
        <MatchingItem keyword="아침" createdAt={new Date()} anonymous={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#000",
    flex: 1,
  },
  item_container: {},
});
