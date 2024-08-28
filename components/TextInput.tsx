import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import {
  configureFonts,
  TextInput as Input,
  TextInputProps as InputProps,
} from "react-native-paper";
import { theme } from "../core/theme";
import { MD3Type } from "react-native-paper/lib/typescript/types";

interface TextInputProps extends InputProps {
  error: boolean;
  errorText?: string;
  description?: string;
}

const fontConfig: Partial<MD3Type> = {
  fontFamily: Platform.select({
    web: 'GothicA1, "Helvetica Neue", Helvetica, Arial, sans-serif',
    ios: "GothicA1, System",
    android: "GothicA1",
    default: "GothicA1",
  }),
  fontWeight: "400",
  fontSize: 13,
  letterSpacing: 0.5,
};

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
        theme={{ fonts: configureFonts({ isV3: true, config: fontConfig }) }}
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
