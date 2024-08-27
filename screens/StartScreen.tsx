import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import Cosmo from "../assets/images/logo.svg";
import { StartLinearGradient } from "../components";
import Button from "../components/Button";
import { Text } from "../components/Text";
import TextInput from "../components/TextInput";
import { RegisterStackParamList } from "../navigation_stack/RegisterStack";
import { fontConfig } from "react-native-paper/lib/typescript/styles/fonts";

type StartScreenProps = NativeStackScreenProps<RegisterStackParamList, "Start">;

export default function StartScreen({
  navigation,
}: StartScreenProps): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const [langugae, setLanguage] = useState<string>("한국어");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isInvalidIdPassword, setIsInvalidIdPassword] =
    useState<boolean>(false);

  const selectLanguage = (e: GestureResponderEvent, lang: string) => {
    setLanguage(lang);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
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
                  <Cosmo width={58} height={58} />
                  <Text style={styles.app_name}>cosmo</Text>
                </View>

                <View style={styles.language_select_container}>
                  <Button
                    icon="chevron-down"
                    mode="text"
                    style={{ margin: 0 }}
                    labelStyle={{
                      fontSize: 15,
                    }}
                    contentStyle={{
                      flexDirection: "row-reverse",
                    }}
                    textColor="#fff"
                    compact={true}
                    onPress={handlePresentModalPress}
                  >
                    {langugae}
                  </Button>
                </View>
              </View>
              <View style={[styles.auth_container, { width: "100%" }]}>
                <TextInput
                  label="휴대폰 번호"
                  returnKeyType="next"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  error={isInvalidIdPassword}
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
                  error={isInvalidIdPassword}
                  errorText="잘못된 아이디 혹은 비밀번호입니다."
                  autoCapitalize="none"
                  textContentType="password"
                  secureTextEntry={true}
                  keyboardType="default"
                />
                <Button
                  mode="contained"
                  onPress={() => setIsInvalidIdPassword(true)}
                  textColor="#fff"
                >
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
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.modalContainer}>
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
            </BottomSheetView>
          </BottomSheetModal>
        </StartLinearGradient>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
    flex: 1,
    gap: 12,
  },
  app_name: {
    display: "flex",
    fontWeight: "light",
    fontSize: 44,
    lineHeight: 44,
    textAlign: "center",
    color: "#fff",
  },
  language_select_container: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    flex: 2,
    textAlign: "center",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  divider: {
    width: "10%",
    height: 3,
    backgroundColor: "#ddd",
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
