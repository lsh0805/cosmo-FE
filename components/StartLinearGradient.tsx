import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient"; // Make sure to use the correct import
import { StyleSheet, ViewStyle } from "react-native";

interface StartLinearGradientProps {
  style?: ViewStyle;
  children?: ReactNode;
}

const StartLinearGradient: React.FC<StartLinearGradientProps> = ({
  style,
  children,
}) => {
  return (
    <LinearGradient
      colors={["#000005", "#0a2472"]}
      start={[0.5, 0]}
      end={[0.5, 1]}
      style={[styles.defaultStyle, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default StartLinearGradient;

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
  },
});
