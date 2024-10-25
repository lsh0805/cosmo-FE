import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { MainStackParamList } from "../../navigation_stack/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ChattingItem from "../../components/ChattingItem";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { restApiUrl } from "../../utility/api";
import { MaterialIcons } from "@expo/vector-icons";

type ChattingListProps = NativeStackScreenProps<
  MainStackParamList,
  "ChattingList"
>;

type StateType = {
  chattingRoomList: ChattingRoom[];
};

export default function ChattingListScreen({
  navigation,
}: ChattingListProps): React.JSX.Element {
  const [state, setState] = useState<StateType>({ chattingRoomList: [] });

  useEffect(() => {
    fetchAllChat();
  }, []);

  const fetchAllChat = async () => {
    try {
      const response = await axios.post(restApiUrl.fetchChattingRoomList, {});
      const { success, chattingRoomList } = response.data;
      if (success) setState({ chattingRoomList: chattingRoomList });
    } catch (error) {
      console.log(error);
    }
  };

  const findChat = () => {};

  const getListView = () => {};

  return (
    <SafeAreaView>
      <View style={styles.search_field}>
        <TextInput style={styles.search_input} />
        <MaterialIcons name="search" size={14} />
      </View>
      <ScrollView>
        <View style={styles.item_container}>
          <FlatList
            data={state.chattingRoomList}
            renderItem={({ item, index }) => (
              <ChattingItem
                keyword={item.keyword}
                opponent={item.opponent}
                createdAt={item.createdAt}
                unReadMessagesCount={item.unReadMessagesCount}
                onRemove={() => {}}
                key={index}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search_field: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 22,
    flex: 1,
  },
  search_input: {
    flex: 9,
  },
  item_container: {
    gap: 54,
  },
});
