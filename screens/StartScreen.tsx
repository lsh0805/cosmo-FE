import { useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../App";
import Cosmo from "../assets/images/logo.svg";
import { StartLinearGradient } from "../components";
import Button from "../components/Button";
import { Text } from "../components/Text";
import TextInput from "../components/TextInput";
import { Divider, Modal, Portal } from "react-native-paper";

type StartScreenProps = NativeStackScreenProps<RootStackParamList, "Start">;

export default function StartScreen({
  navigation,
}: StartScreenProps): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const [langugae, setLanguage] = useState<string>("한국어");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const translateY = useSharedValue(300);

  const showModal = () => {
    setVisible(true);
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  };

  const hideModal = () => {
    translateY.value = withTiming(300, {
      duration: 300,
      easing: Easing.in(Easing.ease),
    });
    setTimeout(() => setVisible(false), 300);
  };

  const selectLanguage = (e: GestureResponderEvent, lang: string) => {
    setLanguage(lang);
    hideModal();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <StartLinearGradient>
      <View style={styles.layout}>
        <View
          style={[
            styles.container,
            { width: width * 0.8, height: height * 0.8 },
          ]}
        >
          <View style={[styles.top_container, { width: "100%" }]}>
            <View style={styles.logo_container}>
              <Cosmo width={50} height={50} />
              <Text style={styles.app_name}>cosmo</Text>
            </View>
            <View style={styles.language_select_container}>
              <Button
                icon="chevron-down"
                mode="text"
                contentStyle={{ flexDirection: "row-reverse" }}
                textColor="#fff"
                compact={true}
                onPress={showModal}
              >
                {langugae}
              </Button>
              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={[styles.modalContainer, animatedStyle]}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <Button
                      mode="text"
                      icon="close"
                      compact={true}
                      onPress={hideModal}
                      style={{ width: 50 }}
                    >
                      {null}
                    </Button>
                  </View>
                  <View style={{ width: "100%" }}>
                    <Button
                      mode="text"
                      onPress={(e) => selectLanguage(e, "한국어")}
                    >
                      한국어
                    </Button>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={{ width: "100%" }}>
                    <Button
                      mode="text"
                      onPress={(e) => selectLanguage(e, "English")}
                    >
                      English
                    </Button>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={{ width: "100%" }}>
                    <Button
                      mode="text"
                      onPress={(e) => selectLanguage(e, "日本語")}
                    >
                      日本語
                    </Button>
                  </View>
                </Modal>
              </Portal>
            </View>
          </View>
          <View style={[styles.auth_container, { width: "100%" }]}>
            <TextInput
              label="휴대폰 번호"
              returnKeyType="next"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              error={false}
              errorText=""
              autoCapitalize="none"
              textContentType="telephoneNumber"
              keyboardType="number-pad"
            />
            <TextInput
              label="비밀번호"
              returnKeyType="next"
              value={password}
              onChangeText={setPassword}
              error={false}
              errorText=""
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
              keyboardType="default"
            />
            <Button mode="contained" onPress={() => {}} textColor="#fff">
              로그인
            </Button>
          </View>
          <View style={(styles.bottom_container, { width: "100%" })}>
            <Button
              mode="outlined"
              textColor="#fff"
              style={[{ borderColor: "#fff", borderWidth: 3 }]}
              onPress={() => {
                navigation.navigate("Register_1");
              }}
            >
              가입하기
            </Button>
          </View>
        </View>
      </View>
    </StartLinearGradient>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
  },
  container: {
    display: "flex",
    backgroundColor: "none",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  top_container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 2,
  },
  logo_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 15,
  },
  app_name: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "light",
    fontSize: 48,
    color: "#fff",
  },
  language_select_container: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  divider: {
    width: "10%",
    height: 3,
    backgroundColor: "#ddd", // 필요에 따라 색상을 조정
  },
  auth_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 5,
  },
  bottom_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    width: "100%",
    marginVertical: 20,
    backgroundColor: "#ff65c9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
  },
});
