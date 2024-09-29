import { createStackNavigator } from "@react-navigation/stack";

export type SettingStackParamList = {
  Setting: undefined;
  ProfileSetting: undefined;
  ProfileImageEdit: undefined;
};

export const SettingStack = createStackNavigator<SettingStackParamList>();
