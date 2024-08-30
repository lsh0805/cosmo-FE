import { createStackNavigator } from "@react-navigation/stack";

type RootStackParamList = {
  Register: undefined;
  Main: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();
