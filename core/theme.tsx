import { Platform } from "react-native";
import { configureFonts, DefaultTheme } from "react-native-paper";
import { MD3Type } from "react-native-paper/lib/typescript/types";

const fontConfig: Partial<MD3Type> = {
  fontFamily: Platform.select({
    web: 'NotoSansKR400, GothicA1400, "Helvetica Neue", Helvetica, Arial, sans-serif',
    ios: "System",
    android: "GothicA1700",
    default: "NotoSansKR400",
  }),
};

export const theme = {
  ...DefaultTheme,
  fonts: configureFonts({ isV3: true, config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    text: "#1E212B",
    primary: "#1260cc",
    secondary: "#1F2732",
    error: "#c71585",
  },
};
