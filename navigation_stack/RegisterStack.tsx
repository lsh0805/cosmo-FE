import { createStackNavigator } from "@react-navigation/stack";

export type RegisterStackParamList = {
  Start: undefined;
  Register_1: undefined;
  Register_2: undefined;
  Register_3: undefined;
  Register_4: undefined;
  Main: { screen: string };
};

export const RegisterStack = createStackNavigator<RegisterStackParamList>();
