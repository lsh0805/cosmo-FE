import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { IconButton, Provider } from "react-native-paper";
import { RegisterProvider } from "./contexts/RegisterProvider";
import { theme } from "./core/theme";
import { MainStack, MainStackParamList } from "./navigation_stack/MainStack";
import { RegisterStack } from "./navigation_stack/RegisterStack";
import { RootStack } from "./navigation_stack/RootStack";
import { SettingStack } from "./navigation_stack/SettingStack";
import { StartScreen } from "./screens";
import {
  ChattingListScreen,
  FriendsScreen,
  MatchingScreen,
  ProfileScreen,
} from "./screens/MainScreen";
import HomeScreen from "./screens/MainScreen/HomeScreen";
import {
  RegisterScreen_1,
  RegisterScreen_2,
  RegisterScreen_3,
  RegisterScreen_4,
} from "./screens/RegisterScreen";
import ProfileImageEditScreen from "./screens/SettingScreen/ProfileImageEditScreen";
import ProfileSettingScreen from "./screens/SettingScreen/ProfileSettingScreen";
import SettingScreen from "./screens/SettingScreen/SettingScreen";
import { RootSiblingParent } from "react-native-root-siblings";

const Tab = createBottomTabNavigator<MainStackParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTitle: "@id",

        headerRight: () => {
          return (
            <IconButton
              icon={"cog"}
              size={26}
              iconColor="#fff"
              animated={true}
              onPress={() => {
                navigation.navigate("SettingStack");
              }}
            />
          );
        },
        headerStyle: {
          backgroundColor: "#000",
          borderBottomColor: "transparent",
          shadowColor: "transparent",
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          color: "#fff",
          backgroundColor: undefined,
          fontFamily: "NotoSansKR400",
        },
        tabBarStyle: {
          height: 70,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "#000",
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={"#fff"} size={26} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Friends"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={"#fff"}
              size={26}
            />
          ),
        }}
        component={FriendsScreen}
      />
      <Tab.Screen
        name="Matching"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" color={"#fff"} size={26} />
          ),
        }}
        component={MatchingScreen}
      />
      <Tab.Screen
        name="ChattingList"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" color={"#fff"} size={26} />
          ),
        }}
        component={ChattingListScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={"#fff"}
              size={26}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

function RegisterStackScreens() {
  return (
    <RegisterProvider>
      <RegisterStack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
          transitionSpec: {
            open: TransitionSpecs.FadeInFromBottomAndroidSpec,
            close: TransitionSpecs.FadeOutToBottomAndroidSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      >
        <RegisterStack.Screen name="Start" component={StartScreen} />
        <RegisterStack.Screen name="Register_1" component={RegisterScreen_1} />
        <RegisterStack.Screen name="Register_2" component={RegisterScreen_2} />
        <RegisterStack.Screen name="Register_3" component={RegisterScreen_3} />
        <RegisterStack.Screen name="Register_4" component={RegisterScreen_4} />
      </RegisterStack.Navigator>
    </RegisterProvider>
  );
}

function MainStackScreens() {
  return (
    <MainStack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: TransitionSpecs.FadeInFromBottomAndroidSpec,
          close: TransitionSpecs.FadeOutToBottomAndroidSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}
    >
      <MainStack.Screen name="BottomTabs" component={BottomTabs} />
      <MainStack.Screen name="SettingStack" component={SettingStackScreens} />
    </MainStack.Navigator>
  );
}

function SettingStackScreens() {
  return (
    <SettingStack.Navigator
      initialRouteName="Setting"
      screenOptions={({ navigation }) => {
        return {
          headerShown: true,
          headerTitle: "Setting",
          cardStyle: {
            backgroundColor: "#000",
          },
          headerStyle: {
            backgroundColor: "#000",
            borderBottomWidth: 0,
            borderBottomColor: "transparent",
            shadowColor: "transparent",
            elevation: 0,
          },
          headerTitleStyle: {
            color: "#fff",
            backgroundColor: "#000",
            fontFamily: "NotoSansKR400",
          },
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
          transitionSpec: {
            open: TransitionSpecs.FadeInFromBottomAndroidSpec,
            close: TransitionSpecs.FadeOutToBottomAndroidSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        };
      }}
    >
      <SettingStack.Screen name="Setting" component={SettingScreen} />
      <SettingStack.Screen
        name="ProfileSetting"
        component={ProfileSettingScreen}
      />
      <SettingStack.Screen
        name="ProfileImageEdit"
        component={ProfileImageEditScreen}
      />
    </SettingStack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansKR100: require("./assets/fonts/NotoSansKR-100.ttf"),
    NotoSansKR200: require("./assets/fonts/NotoSansKR-200.ttf"),
    NotoSansKR300: require("./assets/fonts/NotoSansKR-300.ttf"),
    NotoSansKR400: require("./assets/fonts/NotoSansKR-400.ttf"),
    NotoSansKR500: require("./assets/fonts/NotoSansKR-500.ttf"),
    NotoSansKR600: require("./assets/fonts/NotoSansKR-600.ttf"),
    NotoSansKR700: require("./assets/fonts/NotoSansKR-700.ttf"),
    NotoSansKR800: require("./assets/fonts/NotoSansKR-800.ttf"),
    NotoSansKR900: require("./assets/fonts/NotoSansKR-900.ttf"),
    GothicA1100: require("./assets/fonts/GothicA1-100.ttf"),
    GothicA1200: require("./assets/fonts/GothicA1-200.ttf"),
    GothicA1300: require("./assets/fonts/GothicA1-300.ttf"),
    GothicA1400: require("./assets/fonts/GothicA1-400.ttf"),
    GothicA1500: require("./assets/fonts/GothicA1-500.ttf"),
    GothicA1600: require("./assets/fonts/GothicA1-600.ttf"),
    GothicA1700: require("./assets/fonts/GothicA1-700.ttf"),
    GothicA1800: require("./assets/fonts/GothicA1-800.ttf"),
    GothicA1900: require("./assets/fonts/GothicA1-900.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <Provider theme={theme}>
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName="RegisterStack"
            screenOptions={{
              headerShown: false,
              transitionSpec: {
                open: TransitionSpecs.FadeInFromBottomAndroidSpec,
                close: TransitionSpecs.FadeOutToBottomAndroidSpec,
              },
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            }}
          >
            <RootStack.Screen
              name="RegisterStack"
              component={RegisterStackScreens}
            />
            <RootStack.Screen name="MainStack" component={MainStackScreens} />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </RootSiblingParent>
  );
}

registerRootComponent(App);
