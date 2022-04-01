import { Platform, Dimensions } from "react-native";

import colors from "./colors";

var width = 0;

if (Platform.OS === "web") {
  width = 400;
} else {
  width = Dimensions.get("window").width - 30;
}

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    //fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    //outline: Platform.OS === "web" ? "none" : null,
  },
  windowWidth: width,
  windowHeight: Dimensions.get("window").height,
};
