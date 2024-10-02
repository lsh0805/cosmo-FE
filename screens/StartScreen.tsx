import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
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
import { restApiUrl } from "../utility/api";
import { storage_keys } from "../utility/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type StartScreenProps = NativeStackScreenProps<RegisterStackParamList, "Start">;

interface State {
  language: string;
  email: string;
  password: string;
  isInvalid: boolean;
  loading: boolean;
}

export default function StartScreen({
  navigation,
}: StartScreenProps): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const [state, setState] = useState<State>({
    language: "한국어",
    email: "",
    password: "",
    isInvalid: false,
    loading: false,
  });

  const selectLanguage = (language: string) => {
    bottomSheetModalRef.current?.close();
    setState((prevState) => ({ ...prevState, language }));
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

  const onChangeEmailInput = (email: string) => {
    setState((prevState) => ({ ...prevState, email, isInvalid: false }));
  };

  const onChangePasswordInput = (password: string) => {
    setState((prevState) => ({ ...prevState, password, isInvalid: false }));
  };

  const onPressSignInButton = async () => {
    navigation.navigate("MainStack", { screen: "Profile" });
    return;
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const response = await axios.post(restApiUrl.signIn, {
        email: state.email,
        password: state.password,
      });
      console.log(response.data);
      const { success, token } = response.data;
      if (success) {
        console.log(token);
        await SecureStore.setItemAsync(storage_keys.AuthenticationToken, token);
        navigation.navigate("MainStack", { screen: "Profile" });
      } else {
        setState((prevState) => ({ ...prevState, isInvalid: true }));
      }
    } catch (error) {
      console.log("error occur: ", error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

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
                    icon={
                      <MaterialCommunityIcons
                        name="chevron-down"
                        color={"#fff"}
                        size={12}
                      />
                    }
                    mode="contained"
                    contentType="icon-text"
                    style={{
                      margin: 0,
                      backgroundColor: "rgba(0,0,0,0)",
                    }}
                    labelStyle={{
                      fontSize: 15,
                      flex: 0,
                    }}
                    contentStyle={{
                      flexDirection: "row-reverse",
                      columnGap: 6,
                    }}
                    label={state.language}
                    onPress={() => handlePresentModalPress()}
                  />
                </View>
              </View>
              <View style={[styles.auth_container, { width: "100%" }]}>
                <TextInput
                  label="이메일 주소"
                  returnKeyType="next"
                  value={state.email}
                  onChangeText={onChangeEmailInput}
                  error={state.isInvalid}
                  errorText=""
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
                <TextInput
                  label="비밀번호"
                  returnKeyType="next"
                  value={state.password}
                  onChangeText={onChangePasswordInput}
                  error={state.isInvalid}
                  errorText="잘못된 아이디 혹은 비밀번호입니다."
                  autoCapitalize="none"
                  textContentType="password"
                  secureTextEntry={true}
                  keyboardType="default"
                />
                <Button
                  mode="contained"
                  contentType="text"
                  onPress={() => onPressSignInButton()}
                  label={"로그인"}
                  style={{ marginTop: 50, width: "100%" }}
                />
              </View>
              <View style={(styles.bottom_container, { width: "100%" })}>
                <Button
                  mode="outlined"
                  contentType="text"
                  label={"가입하기"}
                  onPress={() => {
                    navigation.navigate("Register_1");
                  }}
                />
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
              <View style={styles.modalInnerContainer}>
                <Divider style={styles.divider} />
                <View style={{ width: "100%" }}>
                  <Button
                    mode="raw"
                    label="한국어"
                    labelStyle={{ color: "#000" }}
                    onPress={() => selectLanguage("한국어")}
                  />
                </View>
                <Divider style={styles.divider} />
                <View style={{ width: "100%" }}>
                  <Button
                    mode="raw"
                    label="English"
                    labelStyle={{ color: "#000" }}
                    onPress={() => selectLanguage("English")}
                  />
                </View>
                <Divider style={styles.divider} />
                <View style={{ width: "100%" }}>
                  <Button
                    mode="raw"
                    label="日本語"
                    labelStyle={{ color: "#000" }}
                    onPress={() => selectLanguage("日本語")}
                  />
                </View>
                <Divider style={styles.divider} />
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
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modalInnerContainer: {
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#cfe3fe",
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
