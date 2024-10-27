import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Text from "./Text";

interface TestProps extends React.ComponentProps<typeof View> {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const Test: React.FC<TestProps> = ({
  style,
  contentStyle,
  labelStyle,
  children,
}) => {
  return (
    <View style={[styles.btn, style]}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: "#222",
  },
});
