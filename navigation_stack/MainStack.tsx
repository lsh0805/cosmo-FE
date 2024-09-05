import { createStackNavigator } from "@react-navigation/stack";

export type MainStackParamList = {
  Start: undefined;
  Friends: undefined;
  BottomTabs: undefined;
};

export const MainStack = createStackNavigator<MainStackParamList>();
