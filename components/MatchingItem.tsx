import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { TouchableHighlight } from "@gorhom/bottom-sheet";
import React, { ReactElement } from "react";
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableHighlightProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import Text from "./Text";
import { Feather } from "@expo/vector-icons";

export const MathcingStatus = {
  PROGRESS: "PROGRESS",
  EXPIRED: "EXPIRED",
  COMPLETED: "COMPLETED",
};

export type MathicStatusType =
  (typeof MathcingStatus)[keyof typeof MathcingStatus];

interface MatchingItemProps extends ViewProps {
  keyword: string;
  createdAt: Date;
  anonymous: boolean;
  status?: MathicStatusType;
  style?: StyleProp<ViewStyle>;
}

const MatchingItem: React.FC<MatchingItemProps> = ({
  keyword,
  createdAt,
  anonymous,
  status,
  style,
  ...props
}) => {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 360,
      duration: 1200000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.item, style]}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Feather
          name="loader"
          size={24}
          color={"#fff"}
          style={{
            alignSelf: "center",
          }}
        />
      </Animated.View>
      <View style={styles.content}>
        <Text style={{ color: "#fff", fontSize: 20 }}>{keyword}</Text>
        <Text style={{ color: "#fff" }}>
          {createdAt.toLocaleDateString()} (6D 12H 10M 29S)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    gap: 15,
    backgroundColor: "#111",
    borderRadius: 20,
  },
  content: {},
});

export default MatchingItem;
