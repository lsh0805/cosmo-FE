import { Route } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { RegisterStackParamList } from "../navigation_stack/RegisterStack";
import StartLinearGradient from "./StartLinearGradient";
import Text from "./Text";

interface RegisterLayoutProps {
  title: string;
  description: string;
  navigation: NativeStackScreenProps<
    RegisterStackParamList,
    keyof RegisterStackParamList
  >["navigation"];
  children?: ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({
  title,
  description,
  navigation,
  children,
}) => {
  return (
    <StartLinearGradient>
      <View style={styles.layout}>
        <IconButton
          icon={"arrow-left"}
          size={20}
          animated={true}
          onPress={navigation.goBack}
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
    fontWeight: "light",
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
