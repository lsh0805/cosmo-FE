import { Image } from "expo-image";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import Text from "./Text";

interface ChattingItemProps extends ViewProps {
  keyword: string;
  createdAt: Date;
  lastChat?: Chat;
  unReadMessagesCount: number;
  opponent: User;
  style?: StyleProp<ViewStyle>;
  onRemove: () => void;
}

const getLastChattingTimeString = (lastChatDate: Date) => {
  const now = new Date();
  if (lastChatDate.toLocaleDateString() === now.toLocaleDateString()) {
    return lastChatDate.getHours() + ":" + lastChatDate.getMinutes();
  } else {
    return lastChatDate.toLocaleDateString();
  }
};

export const ChattingItem: React.FC<ChattingItemProps> = ({
  keyword,
  createdAt,
  lastChat,
  unReadMessagesCount,
  opponent,
  style,
  ...props
}) => {
  return (
    <View style={[styles.item, style]} {...props}>
      <View style={styles.left_side}>
        <Image
          style={styles.image}
          source="profile_img"
          contentFit="cover"
          transition={1000}
        />
        <Text>{opponent.name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={{ color: "#fff", fontSize: 20 }}>{keyword}</Text>
        <Text>
          {lastChat !== undefined
            ? lastChat?.writter.name + ": " + lastChat?.text
            : "대화방이 만들어졌습니다."}
        </Text>
      </View>
      <View style={styles.right_side}>
        <Text>
          {lastChat !== undefined
            ? getLastChattingTimeString(lastChat.createdAt)
            : getLastChattingTimeString(createdAt)}
        </Text>
        <Text style={styles.unread_message_count}>{unReadMessagesCount}</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 6,
    gap: 15,
    backgroundColor: "#222",
    borderRadius: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  content: { width: "100%", flex: 1, gap: 24 },
  content_header: { flexDirection: "row", justifyContent: "space-between" },
  left_side: {
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 12,
    height: "100%",
  },
  right_side: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
  },
  unread_message_count: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    backgroundColor: "#ff7b00",
    textAlign: "center",
  },
});

export default ChattingItem;
