import { IconProps } from "@expo/vector-icons/build/createIconSet";
import * as React from "react";
import {
  Animated,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { TouchableRipple, TouchableRippleProps } from "react-native-paper";
import { theme } from "../core/theme";
import Text from "./Text";

interface ButtonProps extends TouchableRippleProps {
  mode?: "raw" | "contained" | "outlined" | "text";
  contentType?: "left-icon-text" | "text" | "icon" | "icon-with-text";
  icon?: React.ReactElement<IconProps<string>>;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  mode,
  contentType,
  icon,
  style,
  contentStyle,
  labelStyle,
  loading,
  children,
  ...props
}) => {
  const initialElevation = 1;
  const activeElevation = 2;

  const { current: elevation } = React.useRef<Animated.Value>(
    new Animated.Value(initialElevation)
  );

  React.useEffect(() => {
    elevation.setValue(initialElevation);
  }, [true, elevation, initialElevation]);

  const handlePressIn = () => {
    const scale = 3;
    Animated.timing(elevation, {
      toValue: activeElevation,
      duration: 200 * scale,
      useNativeDriver:
        Platform.OS === "web" ||
        Platform.constants.reactNativeVersion.minor <= 72,
    }).start();
  };

  const handlePressOut = () => {
    const scale = 3;
    Animated.timing(elevation, {
      toValue: initialElevation,
      duration: 150 * scale,
      useNativeDriver:
        Platform.OS === "web" ||
        Platform.constants.reactNativeVersion.minor <= 72,
    }).start();
  };

  const getButtonStyle = (mode: ButtonProps["mode"]) => {
    switch (mode) {
      case "outlined":
        return [styles.btn, styles.btn_outlined, style];
      case "text":
        return [styles.btn, styles.btn_text, style];
      case "raw":
        return [style];
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
              <Text style={[styles.label_style, labelStyle]}>{children}</Text>
            </View>
          </View>
        );
      case "icon-with-text":
        if (icon === undefined) return null;
        return (
          <View style={getContentStyle(contentType)}>
            {icon}
            <Text style={[styles.label_style, labelStyle]}>{children}</Text>
          </View>
        );
      case "icon":
        if (icon === undefined) return null;
        return <View style={getContentStyle(contentType)}>{icon}</View>;
      case "text":
      default:
        return (
          <View style={getContentStyle(contentType)}>
            <Text style={[styles.label_style, labelStyle]}>{children}</Text>
          </View>
        );
    }
  };

  return (
    <TouchableRipple
      style={getButtonStyle(mode)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {getContentComponent(contentType)}
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
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
    fontFamily: "GothicA1700",
    color: "#fff",
    textAlign: "center",
  },
});

export default Button;
