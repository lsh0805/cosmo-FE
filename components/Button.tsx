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
  mode?: "raw" | "contained" | "outlined" | "text";
  contentType?: "left-icon-text" | "text" | "icon" | "icon-with-text";
  icon?: ReactElement<IconProps<string>>;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
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
  loading,
  onPress,
}) => {
  const getButtonStyle = (mode: ButtonProps["mode"]) => {
    switch (mode) {
      case "outlined":
        return [styles.btn, styles.btn_outlined, style];
      case "text":
        return [styles.btn, styles.btn_text, style];
      case "raw":
        return [styles.btn, style];
      case "contained":
      default:
        return [styles.btn, styles.btn_contained, style];
    }
  };

  const getContentStyle = (contentType: ButtonProps["contentType"]) => {
    switch (contentType) {
      case "left-icon-text":
        return [styles.content, styles.content_left_icon_text, contentStyle];
      case "icon-with-text":
        return [styles.content, styles.content_icon_with_text, contentStyle];
      case "icon":
        return [styles.content, styles.content_icon, contentStyle];
      case "text":
      default:
        return [styles.content, styles.content_text, contentStyle];
    }
  };

  const getContentComponent = (contentType: ButtonProps["contentType"]) => {
    switch (contentType) {
      case "left-icon-text":
        if (icon === undefined) return null;
        return (
          <View style={getContentStyle(contentType)}>
            <View style={styles.content_top_element}>{icon}</View>
            <View style={styles.content_center_element}>
              <Text style={[styles.label_style, labelStyle]}>{label}</Text>
            </View>
          </View>
        );
      case "icon-with-text":
        if (icon === undefined) return null;
        return (
          <View style={getContentStyle(contentType)}>
            {icon}
            <Text style={[styles.label_style, labelStyle]}>{label}</Text>
          </View>
        );
      case "icon":
        if (icon === undefined) return null;
        return <View style={getContentStyle(contentType)}>{icon}</View>;
      case "text":
      default:
        return (
          <View style={getContentStyle(contentType)}>
            <Text style={[styles.label_style, labelStyle]}>{label}</Text>
          </View>
        );
    }
  };

  return (
    <TouchableHighlight
      underlayColor={"rgba(80, 80, 80, 0.2)"}
      activeOpacity={0.6}
      style={getButtonStyle(mode)}
      onPress={onPress}
    >
      {getContentComponent(contentType)}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  btn_contained: {
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
  },
  btn_outlined: {
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderColor: "#fff",
    borderWidth: 2,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  content_left_icon_text: {
    position: "relative",
    justifyContent: "flex-start",
    paddingVertical: 12,
  },
  content_icon_with_text: {
    columnGap: 7,
  },
  content_icon: {},
  content_text: {},
  content_top_element: {},
  content_center_element: {
    position: "absolute",
    width: "100%",
  },
  label_style: {
    fontSize: 15,
    fontFamily: "NotoSansKR700",
    color: "#fff",
    textAlign: "center",
  },
});

export default Button;
