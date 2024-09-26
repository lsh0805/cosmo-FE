import { createStackNavigator } from "@react-navigation/stack";

type RootStackParamList = {
  RegisterStack: undefined;
  MainStack: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();
