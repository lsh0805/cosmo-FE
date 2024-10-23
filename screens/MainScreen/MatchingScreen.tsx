import React, { useEffect } from "react";
import { Text } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import MatchingItem, {
  MatchingStatusType,
} from "../../components/MatchingItem";
import { Button } from "../../components";
import { FontAwesome5 } from "@expo/vector-icons";
import { MainStackParamList } from "../../navigation_stack/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type MatchingProps = NativeStackScreenProps<MainStackParamList, "Matching">;

type MatchingItemType = {
  keyword: string;
  createdAt: Date;
  anonymous: boolean;
  status: MatchingStatusType;
};

let MatchingList: MatchingItemType[] = [
  {
    keyword: "아침",
    createdAt: new Date(),
    status: "PROGRESS",
    anonymous: true,
  },
  {
    keyword: "햇살",
    createdAt: new Date(),
    status: "PROGRESS",
    anonymous: false,
  },
  {
    keyword: "새벽",
    createdAt: new Date(),
    status: "PROGRESS",
    anonymous: true,
  },
  {
    keyword: "이슬",
    createdAt: new Date(),
    status: "COMPLETED",
    anonymous: true,
  },
  {
    keyword: "꽃",
    createdAt: new Date(),
    status: "EXPIRED",
    anonymous: true,
  },
];

export default function MatchingScreen({
  navigation,
}: MatchingProps): React.JSX.Element {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "키워드 매칭",
    });
  }, []);

  return (
    <View style={styles.layout}>
      <Button
        style={{
          marginVertical: 20,
          paddingVertical: 10,
          backgroundColor: "#222",
        }}
        icon={<FontAwesome5 size={24} name="plus" color="#fff" />}
        mode="contained"
        contentType="icon"
        onPress={() => {
          navigation.navigate("CreateMatching");
        }}
      />
      <ScrollView>
        <View style={styles.item_container}>
          <FlatList data={Mat}></FlatList>
          <MatchingItem
            keyword="아침"
            status="PROGRESS"
            createdAt={new Date()}
            anonymous={true}
            onRemove={() => {}}
          />
          <MatchingItem
            keyword="햇살"
            status="PROGRESS"
            createdAt={new Date()}
            anonymous={true}
            onRemove={() => {}}
          />
          <MatchingItem
            keyword="새벽"
            status="PROGRESS"
            createdAt={new Date()}
            anonymous={true}
            onRemove={() => {}}
          />
          <MatchingItem
            keyword="이슬"
            status="COMPLETED"
            createdAt={new Date()}
            anonymous={true}
            onRemove={() => {}}
          />
          <MatchingItem
            keyword="꽃"
            status="EXPIRED"
            createdAt={new Date()}
            anonymous={true}
            onRemove={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#000",
    flex: 1,
    paddingHorizontal: 15,
  },
  item_container: {
    gap: 54,
  },
});
