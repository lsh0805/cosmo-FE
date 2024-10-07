import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button as PaperButton,
  Dialog,
  Portal,
  RadioButton,
  Switch,
  Text,
  Divider,
} from "react-native-paper";
import { Button, TextInput } from "../../components";
import { SettingStackParamList } from "../../navigation_stack/SettingStack";

type NottificationSettingProps = NativeStackScreenProps<
  SettingStackParamList,
  "NotificationSetting"
>;

interface NotificationState {
  noti_sound: boolean;
  noti_vibration: boolean;
  noti_request_friend: boolean;
  noti_post_like: boolean;
  noti_post_new_comment: boolean;
  noti_new_message: boolean;
  noti_catch_matching: boolean;
}

export default function NotificationSettingScreen({
  navigation,
}: NottificationSettingProps) {
  const [notificationState, setNotificationState] =
    React.useState<NotificationState>({
      noti_sound: false,
      noti_vibration: false,
      noti_request_friend: false,
      noti_post_like: false,
      noti_post_new_comment: false,
      noti_new_message: false,
      noti_catch_matching: false,
    });

  return (
    <View style={styles.layout}>
      <View style={styles.section_container}>
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.section_title}>알림 설정</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.item_header}>
              <Text style={styles.item_label}>알림 소리</Text>
              <Switch
                value={notificationState.noti_sound}
                onValueChange={(value: boolean) =>
                  setNotificationState({
                    ...notificationState,
                    noti_sound: value,
                  })
                }
              />
            </View>
          </View>
          <Divider style={{ borderWidth: 1 }} />
          <View style={styles.item}>
            <View style={styles.item_header}>
              <Text style={styles.item_label}>알림 진동</Text>
              <Switch
                value={notificationState.noti_vibration}
                onValueChange={(value: boolean) =>
                  setNotificationState({
                    ...notificationState,
                    noti_vibration: value,
                  })
                }
              />
            </View>
          </View>
          <Divider style={{ borderWidth: 1 }} />
          <View style={styles.item}>
            <View style={styles.item_header}>
              <Text style={styles.item_label}>새로운 메시지 알림</Text>
              <Switch
                value={notificationState.noti_new_message}
                onValueChange={(value: boolean) =>
                  setNotificationState({
                    ...notificationState,
                    noti_new_message: value,
                  })
                }
              />
            </View>
          </View>
          <Divider style={{ borderWidth: 1 }} />
          <View style={styles.item}>
            <View style={styles.item_header}>
              <Text style={styles.item_label}>친구 요청 알림</Text>
              <Switch
                value={notificationState.noti_request_friend}
                onValueChange={(value: boolean) =>
                  setNotificationState({
                    ...notificationState,
                    noti_request_friend: value,
                  })
                }
              />
            </View>
          </View>
          <Divider style={{ borderWidth: 1 }} />
          <View style={styles.item}>
            <View style={styles.item_header}>
              <Text style={styles.item_label}>매칭 성사 알림</Text>
              <Switch
                value={notificationState.noti_catch_matching}
                onValueChange={(value: boolean) =>
                  setNotificationState({
                    ...notificationState,
                    noti_catch_matching: value,
                  })
                }
              />
            </View>
          </View>
          <Divider style={{ borderWidth: 1 }} />
          <View style={styles.item}>
            <View style={styles.item_header}>
              <Text style={styles.item_label}>내 게시글 새 댓글 알림</Text>
              <Switch
                value={notificationState.noti_post_new_comment}
                onValueChange={(value: boolean) =>
                  setNotificationState({
                    ...notificationState,
                    noti_post_new_comment: value,
                  })
                }
              />
            </View>
          </View>
          <Divider style={{ borderWidth: 1 }} />
          <View style={styles.item}>
            <View style={styles.item_header}>
              <Text style={styles.item_label}>내 게시글 좋아요 알림</Text>
              <Switch
                value={notificationState.noti_post_like}
                onValueChange={(value: boolean) =>
                  setNotificationState({
                    ...notificationState,
                    noti_post_like: value,
                  })
                }
              />
            </View>
          </View>
        </View>
      </View>
    </View>
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
    marginBottom: 7,
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
  item: {},
  item_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    textAlign: "center",
  },
  item_label: {
    fontSize: 20,
    fontFamily: "NotoSansKR700",
    verticalAlign: "middle",
    color: "#fff",
  },
  item_description: {
    color: "#aaa",
    fontSize: 14,
    fontFamily: "GothicA1700",
  },
});
