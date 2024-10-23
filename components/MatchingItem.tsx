import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import Button from "./Button";
import Text from "./Text";
import axios from "axios";
import { restApiUrl } from "../utility/api";
import ConfirmDialog from "./ConfirmDialog";

export const MathcingStatus = {
  PROGRESS: "PROGRESS",
  EXPIRED: "EXPIRED",
  COMPLETED: "COMPLETED",
} as const;

export type MatchingStatusType =
  (typeof MathcingStatus)[keyof typeof MathcingStatus];

interface MatchingItemProps extends ViewProps {
  keyword: string;
  createdAt: Date;
  anonymous: boolean;
  status: MatchingStatusType;
  style?: StyleProp<ViewStyle>;
  onRemove: () => void;
}

export const MatchingItem: React.FC<MatchingItemProps> = ({
  keyword,
  createdAt,
  anonymous,
  status,
  style,
  ...props
}) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 360,
      duration: 1200000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const getStatusIcon = () => {
    switch (status) {
      case "PROGRESS":
        return (
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
        );
      case "COMPLETED":
        return (
          <Feather
            name="check"
            size={24}
            color={"#305cde"}
            style={{
              alignSelf: "center",
            }}
          />
        );
      case "EXPIRED":
        return (
          <MaterialCommunityIcons
            name="timer-sand-complete"
            size={24}
            color={"#fada5e"}
            style={{
              alignSelf: "center",
            }}
          />
        );
      default:
        return undefined;
    }
  };

  const getDescription = () => {
    switch (status) {
      case "COMPLETED":
        return (
          <Text style={{ color: "#305cde" }}>채팅방이 개설되었습니다.</Text>
        );
      case "EXPIRED":
        return <Text style={{ color: "#fada5e" }}>매칭이 만료되었습니다.</Text>;
      default:
        return undefined;
    }
  };

  const getRemoveConfirmDialog = () => {
    switch (status) {
      case "PROGRESS":
        return (
          <ConfirmDialog
            title="매칭 삭제"
            content="진행중인 매칭을 삭제하시겠습니까?"
            visible={visible}
            onDismiss={hideDialog}
            onPressNo={hideDialog}
            onPressYes={hideDialog}
          />
        );
      default:
        return undefined;
    }
  };

  // const removeMatching = async () => {
  //   try {
  //     const response = await axios.post(restApiUrl.removeMatching, {});
  //     const data = response.data;
  //     const success = data.success;
  //     if (success) {
  //     } else {
  //       setState();
  //     }
  //   } catch (error) {
  //     console.log("error occur: ", error);
  //   } finally {
  //     setState();
  //   }
  // };
  const onPressRemoveMatchingBtn = () => {
    switch (status) {
      case "PROGRESS":
        showDialog();
        break;
      default:
        break;
    }
  };

  return (
    <View
      style={[styles.item, style, { opacity: status === "PROGRESS" ? 1 : 0.5 }]}
    >
      {getStatusIcon()}
      <View style={styles.content}>
        <View>
          <Text style={{ color: "#fff", fontSize: 20 }}>{keyword}</Text>
          <Text style={{ color: "#fff" }}>프로필 미공개</Text>
        </View>
        <View>
          <Text style={{ color: "#fff" }}>
            {createdAt.toLocaleDateString()} (6D 12H 10M 29S)
          </Text>
          {getDescription()}
        </View>
      </View>
      <View style={styles.right_side}>
        <Button
          style={{
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 9999,
          }}
          contentStyle={{ width: "auto" }}
          icon={<FontAwesome5 name="minus" size={20} color={"#fff"} />}
          contentType="icon"
          mode="raw"
          onPress={() => {
            onPressRemoveMatchingBtn();
          }}
        />
      </View>
      {getRemoveConfirmDialog()}
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
  content: { width: "100%", flex: 1, gap: 24 },
  content_header: { flexDirection: "row", justifyContent: "space-between" },
  right_side: {
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
  },
});

export default MatchingItem;
