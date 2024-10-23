import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "../../components";
import { FontAwesome5 } from "@expo/vector-icons";
import { MainStackParamList } from "../../navigation_stack/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type CreateMatchingProps = NativeStackScreenProps<
  MainStackParamList,
  "CreateMatching"
>;

export default function CreateMatchingScreen({
  navigation,
}: CreateMatchingProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.section_container}>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>매칭 키워드</Text>
            <Text style={styles.section_description}>
              상대방과 동일한 매칭 키워드를 입력하면 매칭이 성사됩니다. (최대
              30자)
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput placeholder="매칭 키워드" value={""} error={false} />
          </View>
        </View>
      </View>
      <Button
        label="매칭 시작하기"
        mode="outlined"
        contentType="left-icon-text"
        icon={<FontAwesome5 size={24} name="plus" color="#fff" />}
        style={{ marginBottom: 30, backgroundColor: "#00f" }}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  section_container: {
    rowGap: 16,
  },
  section: {},
  section_header: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  section_title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  section_description: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "bold",
  },
});
