import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.light,
    background: colors.low,
    card: colors.primary,
    text: colors.white,
  },
};
