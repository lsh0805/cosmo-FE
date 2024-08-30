import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import { theme } from "./core/theme";
import {
  StartScreen,
  RegisterScreen_1,
  RegisterScreen_2,
  RegisterScreen_3,
  RegisterScreen_4,
  FriendsScreen,
} from "./screens";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { RegisterProvider } from "./contexts/RegisterProvider";
import { RegisterStack } from "./navigation_stack/RegisterStack";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from "@react-navigation/stack";
import { MainStack } from "./navigation_stack/MainStack";
import { RootStack } from "./navigation_stack/RootStack";

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
      initialRouteName="Friends"
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: TransitionSpecs.FadeInFromBottomAndroidSpec,
          close: TransitionSpecs.FadeOutToBottomAndroidSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}
    >
      <MainStack.Screen name="Friends" component={FriendsScreen} />
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
