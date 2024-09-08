import React from "react";
import { StyleSheet } from "react-native";
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
} from "react-native-paper";
import { theme } from "../core/theme";

const TextButton: React.FC<PaperButtonProps> = ({ mode, style, ...props }) => {
  return (
    <PaperButton
      style={[styles.button, style]}
      labelStyle={styles.text}
      mode={"text"}
      buttonColor={mode == "contained" ? theme.colors.primary : undefined}
      {...props}
    >
      {props.children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "auto",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});

export default TextButton;
