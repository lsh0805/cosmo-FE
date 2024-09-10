import { Platform } from "react-native";
import { configureFonts, DefaultTheme } from "react-native-paper";
import { MD3Type } from "react-native-paper/lib/typescript/types";

const fontConfig: Partial<MD3Type> = {
  fontFamily: Platform.select({
    web: 'NotoSansKR, GothicA1, "Helvetica Neue", Helvetica, Arial, sans-serif',
    ios: "System",
    android: "NotoSansKR",
    default: "NotoSansKR",
  }),
  fontWeight: "600",
  fontSize: 24,
  f
  letterSpacing: 0.5,
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
