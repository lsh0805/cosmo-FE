import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { IconButton } from "react-native-paper";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../App";
import { StartLinearGradient, Text } from "./";
import {
  NavigationProp,
  NavigationState,
  Route,
  useNavigationState,
} from "@react-navigation/native";

interface RegisterLayoutProps {
  title: string;
  description: string;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >;
  children?: ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({
  title,
  description,
  navigation,
  children,
}) => {
  const previousRouteName = useNavigationState((state) => {
    const currentIndex = state.index;
    const previousRoute = state.routes[currentIndex - 1] as Route<string>;

    return previousRoute ? previousRoute.name : null;
  });
  return (
    <StartLinearGradient>
      <View style={styles.layout}>
        <IconButton
          icon={"arrow-left"}
          size={20}
          animated={true}
          onPress={() => {
            navigation.navigate(previousRouteName as keyof RootStackParamList);
          }}
          iconColor="#fff"
          style={{ margin: 0, marginBottom: 24 }}
        />
        <View style={styles.top_container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {children}
      </View>
    </StartLinearGradient>
  );
};

export default RegisterLayout;

const styles = StyleSheet.create({
  layout: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: "#fff",
  },
  description: {
    lineHeight: 24,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#fff",
  },
  top_container: {
    display: "flex",
  },
});
