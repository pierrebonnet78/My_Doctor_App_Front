import { Platform } from "react-native";
import nativeStorage from "./nativeStorage";
import webStorage from "./webStorage";

function platformStorage() {
  switch (Platform.OS) {
    case "web":
      return webStorage;
    default:
      return nativeStorage;
  }
}

export function getToken() {
  return platformStorage().getToken();
}

export function storeToken(authToken) {
  return platformStorage().storeToken(authToken);
}

export function removeToken() {
  return platformStorage().removeToken();
}

export function getUser() {
  return platformStorage().getUser();
}
