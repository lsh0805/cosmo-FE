import { createStackNavigator } from "@react-navigation/stack";

export type MainStackParamList = {
  Start: undefined;
  Home: undefined;
  Profile: undefined;
  Matching: undefined;
  ChattingList: undefined;
  Friends: undefined;
  BottomTabs: undefined;
  SettingStack: undefined;
};

export const MainStack = createStackNavigator<MainStackParamList>();
