import jwtDecode from "jwt-decode";

const key = "authToken";

const webStorage = {
  storeToken(authToken) {
    window.localStorage.setItem(key, authToken);
    return Promise.resolve();
  },

  async getToken() {
    try {
      return await Promise.resolve(window.localStorage.getItem(key));
    } catch (error) {
      console.error("error geting the auth token ", error);
    }
  },

  async getUser() {
    const token = await this.getToken();
    return token ? jwtDecode(token) : null;
  },

  removeToken() {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

export default webStorage;
