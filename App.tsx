import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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

export type RootStackParamList = {
  Start: undefined;
  Register_1: undefined;
  Register_2: undefined;
  Register_3: undefined;
  Register_4: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansKR: require("./assets/fonts/NotoSansKR-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider theme={theme}>
      <RegisterProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Start"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Register_1" component={RegisterScreen_1} />
            <Stack.Screen name="Register_2" component={RegisterScreen_2} />
            <Stack.Screen name="Register_3" component={RegisterScreen_3} />
            <Stack.Screen name="Register_4" component={RegisterScreen_4} />
          </Stack.Navigator>
        </NavigationContainer>
      </RegisterProvider>
    </Provider>
  );
}

registerRootComponent(App);
