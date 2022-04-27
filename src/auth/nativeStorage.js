import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";

const nativeStorage = {
  storeToken(authToken) {
    SecureStore.setItemAsync(key, authToken);
    return Promise.resolve();
  },

  async getToken() {
    try {
      return await Promise.resolve(SecureStore.getItemAsync(key));
    } catch (error) {
      console.error("error geting the auth token ", error);
    }
  },

  async getUser() {
    const token = await this.getToken();
    return token ? jwtDecode(token) : null;
  },

  removeToken() {
    SecureStore.deleteItemAsync(key);
    return Promise.resolve();
  },
};
export default nativeStorage;
