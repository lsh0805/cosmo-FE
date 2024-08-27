import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import { theme } from "./core/theme";
import {
  StartScreen,
  RegisterScreen_1,
  RegisterScreen_2,
  RegisterScreen_3,
  RegisterScreen_4,
} from "./screens";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { RegisterProvider } from "./contexts/RegisterProvider";
import { RegisterStack } from "./navigation_stack/RegisterStack";
import {
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansKR: require("./assets/fonts/NotoSansKR-Thin.ttf"),
    GothicA1: require("./assets/fonts/GothicA1-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider>
      <RegisterProvider>
        <NavigationContainer>
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
            <RegisterStack.Screen
              name="Register_1"
              component={RegisterScreen_1}
            />
            <RegisterStack.Screen
              name="Register_2"
              component={RegisterScreen_2}
            />
            <RegisterStack.Screen
              name="Register_3"
              component={RegisterScreen_3}
            />
            <RegisterStack.Screen
              name="Register_4"
              component={RegisterScreen_4}
            />
          </RegisterStack.Navigator>
        </NavigationContainer>
      </RegisterProvider>
    </Provider>
  );
}

registerRootComponent(App);
