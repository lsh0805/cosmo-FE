import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { Provider } from "react-native-paper";
import { RegisterProvider } from "./contexts/RegisterProvider";
import { theme } from "./core/theme";
import { MainStack, MainStackParamList } from "./navigation_stack/MainStack";
import { RegisterStack } from "./navigation_stack/RegisterStack";
import { RootStack } from "./navigation_stack/RootStack";
import { StartScreen } from "./screens";
import {
  ChattingListScreen,
  FriendsScreen,
  ProfileScreen,
} from "./screens/MainScreen";
import {
  RegisterScreen_1,
  RegisterScreen_2,
  RegisterScreen_3,
  RegisterScreen_4,
} from "./screens/RegisterScreen";

const Tab = createBottomTabNavigator<MainStackParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="ChattingList" component={ChattingListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
    </MainStack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansKR: require("./assets/fonts/NotoSansKR-Thin.ttf"),
    GothicA1: require("./assets/fonts/GothicA1-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Register"
          screenOptions={{
            headerShown: false,
            transitionSpec: {
              open: TransitionSpecs.FadeInFromBottomAndroidSpec,
              close: TransitionSpecs.FadeOutToBottomAndroidSpec,
            },
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          }}
        >
          <RootStack.Screen name="Register" component={RegisterStackScreens} />
          <RootStack.Screen name="Main" component={MainStackScreens} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);
