import React, { ReactElement } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
  Text,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SettingItemButtonProps extends PaperButtonProps {
  btn_icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  style?: StyleProp<ViewStyle>;
}

const SettingItemButton: React.FC<SettingItemButtonProps> = ({
  btn_icon,
  label,
  style,
  ...props
}) => {
  return (
    <PaperButton
      style={styles.btn}
      rippleColor={"rgba(120, 120, 120, 0.2)"}
      onPressIn={() => {}}
      labelStyle={{
        marginHorizontal: 14,
        paddingVertical: 5,
      }}
      contentStyle={{
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
      }}
      {...props}
    >
      <View style={styles.btn_content}>
        <MaterialCommunityIcons size={28} color={"#fff"} name={btn_icon} />
        <Text style={styles.btn_label}>{label}</Text>
      </View>
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    width: "100%",
    borderRadius: 0,
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
  },
  btn_content: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    textAlign: "center",
    gap: 12,
  },
  btn_icon: {
    color: "#fff",
  },
  btn_label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SettingItemButton;
