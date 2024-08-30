import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import { Icon, IconButton } from "react-native-paper";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <View style={styles.layout}>
      <View style={styles.contents}>{children}</View>
      <View style={styles.footer}>
        <Button style={styles.footer_btn} onPressOut={() => console.log(1)}>
          <Icon source="account-multiple" size={18} />
        </Button>
        <Button style={styles.footer_btn} onPressOut={() => console.log(1)}>
          <Icon source="account-multiple" size={18} />
        </Button>
        <Button style={styles.footer_btn} onPressOut={() => console.log(1)}>
          <Icon source="account-multiple" size={18} />
        </Button>
      </View>
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  layout: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  contents: {
    flex: 11,
  },
  footer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#aaa",
  },
  footer_btn: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 0,
  },
});
