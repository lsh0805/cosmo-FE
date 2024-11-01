import { createStackNavigator } from "@react-navigation/stack";

export type SettingStackParamList = {
  Setting: undefined;
  ProfileSetting: undefined;
  ProfileImageEdit: undefined;
  ProfileNameEdit: undefined;
  ProfileMessageEdit: undefined;
  AccountSetting: undefined;
  PasswordReset: undefined;
  DeleteAccount: undefined;
  ThemeSetting: undefined;
  NotificationSetting: undefined;
};

export const SettingStack = createStackNavigator<SettingStackParamList>();
