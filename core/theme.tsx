import { Platform } from "react-native";
import { configureFonts, DefaultTheme } from "react-native-paper";
import { MD3Type } from "react-native-paper/lib/typescript/types";

const fontConfig: Partial<MD3Type> = {
  fontFamily: Platform.select({
    web: 'NotoSansKR, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    ios: "NotoSansKR, System",
    android: "NotoSansKR",
    default: "NotoSansKR",
  }),
  fontWeight: "600",
  letterSpacing: 0.5,
  lineHeight: 50,
  fontSize: 50,
};

export const theme = {
  ...DefaultTheme,
  fonts: configureFonts({ isV3: true, config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    text: "#1E212B",
    primary: "#2337C8",
    secondary: "#1F2732",
    error: "#ED1C24",
  },
};
