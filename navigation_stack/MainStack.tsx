import { createStackNavigator } from "@react-navigation/stack";

export type MainStackParamList = {
  Start: undefined;
  Profile: undefined;
  ChattingList: undefined;
  Friends: undefined;
  BottomTabs: undefined;
};

export const MainStack = createStackNavigator<MainStackParamList>();
