import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { TouchableHighlight } from "@gorhom/bottom-sheet";
import React, { ReactElement } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableHighlightProps,
  View,
  ViewStyle,
} from "react-native";
import Text from "./Text";

interface MenuItemProps extends TouchableHighlightProps {
  label?: string;
  icon?: ReactElement<IconProps<string>>;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  style,
  labelStyle,
  loading,
  ...props
}) => {
  return (
    <TouchableHighlight activeOpacity={0.8} underlayColor="#222" {...props}>
      <View style={[styles.btn_content, style]}>
        {icon}
        <Text style={[styles.btn_label, labelStyle]}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btn_content: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "center",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 12,
  },
  btn_label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default MenuItem;
