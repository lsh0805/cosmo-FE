import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  TextInput as Input,
  TextInputProps as InputProps,
} from "react-native-paper";
import { theme } from "../core/theme";

interface TextInputProps extends InputProps {
  error: boolean;
  errorText?: string;
  description?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  error,
  errorText,
  description,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        mode="outlined"
        textColor="#fff"
        activeOutlineColor="#fff"
        outlineColor="#666"
        error={error}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {error && errorText ? (
        <Text style={styles.error}>{errorText}</Text>
      ) : null}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.secondary,
    fontFamily: "System",
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
