import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { StyleProp, TextStyle } from "react-native";

interface Props {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}
export default function Label({ style, children }: Props) {
  return <Text style={[styles.base, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Pretendard",
  },
});
