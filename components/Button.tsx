import React from "react";
import { StyleSheet } from "react-native";
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
} from "react-native-paper";
import { theme } from "../core/theme";

const Button: React.FC<PaperButtonProps> = ({ mode, style, ...props }) => {
  return (
    <PaperButton
      style={[styles.button, style]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});

export default Button;
