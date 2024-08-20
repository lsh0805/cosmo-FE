import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  TextInput as Input,
  TextInputProps as InputProps,
} from "react-native-paper";
import { theme } from "../core/theme";

interface TextInputProps extends InputProps {
  errorText?: string;
  description?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  errorText,
  description,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor={undefined}
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
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
