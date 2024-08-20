import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-native-paper";
import { theme } from "./core/theme";
import { StartScreen } from "./screens";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";

export type RootStackParamList = {
  Start: undefined;
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
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Start" component={StartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);
