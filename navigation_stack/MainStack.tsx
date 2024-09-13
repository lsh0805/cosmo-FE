import { createStackNavigator } from "@react-navigation/stack";

export type MainStackParamList = {
  Start: undefined;
  Home: undefined;
  Profile: undefined;
  Matching: undefined;
  Setting: undefined;
  ChattingList: undefined;
  Friends: undefined;
  BottomTabs: undefined;
};

export const MainStack = createStackNavigator<MainStackParamList>();
