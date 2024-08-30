import { createStackNavigator } from "@react-navigation/stack";

export type MainStackParamList = {
  Start: undefined;
  Friends: undefined;
};

export const MainStack = createStackNavigator<MainStackParamList>();
