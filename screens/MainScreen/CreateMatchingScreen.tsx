import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "../../components";
import { FontAwesome5 } from "@expo/vector-icons";
import { MainStackParamList } from "../../navigation_stack/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { IconButton, Switch } from "react-native-paper";

type CreateMatchingProps = NativeStackScreenProps<
  MainStackParamList,
  "CreateMatching"
>;

interface InputState {
  keyword: string;
  anonymous: boolean;
}

export default function CreateMatchingScreen({
  navigation,
}: CreateMatchingProps): React.JSX.Element {
  const [state, setState] = useState<InputState>({
    keyword: "",
    anonymous: false,
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "매칭 만들기",
      headerLeft: () => {
        return (
          <IconButton
            icon={"arrow-left"}
            size={20}
            iconColor="#fff"
            animated={true}
            onPressOut={() => {
              navigation.goBack();
            }}
          />
        );
      },
    });
  }, []);

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
            <TextInput
              placeholder="매칭 키워드"
              value={state.keyword}
              error={false}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>프로필 공개여부</Text>
            <Text style={styles.section_description}>
              상대방에게 프로필 공개 여부를 설정합니다. 비공개시 대화중에
              프로필을 공개할 수 있습니다.
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#fff" }}>
              공개여부: {state.anonymous ? "비공개" : "공개"}
            </Text>
            <Switch
              value={state.anonymous}
              onValueChange={(value: boolean) =>
                setState({
                  ...state,
                  anonymous: value,
                })
              }
            />
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
