import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { TouchableHighlight } from "@gorhom/bottom-sheet";
import React, { ReactElement } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { theme } from "../core/theme";
import Text from "./Text";

interface ButtonProps {
  label?: string;
  mode?: "raw" | "contained" | "outlined";
  contentType?: "icon-text" | "text" | "icon";
  icon?: ReactElement<IconProps<string>>;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  mode,
  contentType,
  icon,
  style,
  contentStyle,
  labelStyle,
  onPress,
}) => {
  const getButtonStyle = (mode: ButtonProps["mode"]) => {
    switch (mode) {
      case "outlined":
        return [styles.btn, styles.btn_outlined, style];
      case "raw":
        return [styles.btn, style];
      case "contained":
      default:
        return [styles.btn, styles.btn_contained, style];
    }
  };

  const getContentStyle = (contentType: ButtonProps["contentType"]) => {
    switch (contentType) {
      case "icon-text":
        return [styles.content, styles.content_icon_text, contentStyle];
      case "icon":
        return [styles.content, styles.content_icon, contentStyle];
      case "text":
      default:
        return [styles.content, styles.content_text, contentStyle];
    }
  };

  const getContentComponent = (contentType: ButtonProps["contentType"]) => {
    switch (contentType) {
      case "icon-text":
        if (icon === undefined) return null;
        return (
          <>
            {icon}
            <Text style={[styles.label_style, labelStyle]}>{label}</Text>
          </>
        );
      case "icon":
        if (icon === undefined) return null;
        return <>{icon}</>;
      case "text":
      default:
        return <Text style={[styles.label_style, labelStyle]}>{label}</Text>;
    }
  };

  return (
    <TouchableHighlight
      underlayColor={"rgba(80, 80, 80, 0.2)"}
      activeOpacity={0.6}
      style={getButtonStyle(mode)}
      onPress={onPress}
    >
      <View style={getContentStyle(contentType)}>
        {getContentComponent(contentType)}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_contained: {
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
  },
  btn_outlined: {
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderColor: "#fff",
    borderWidth: 1,
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  content_icon_text: {},
  content_icon: {},
  content_text: {},
  label_style: {
    fontSize: 15,
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
});

export default Button;
