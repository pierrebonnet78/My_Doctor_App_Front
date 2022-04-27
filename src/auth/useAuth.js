import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import { storeToken, removeToken } from "./index";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    removeToken();
  };

  return { user, logOut, logIn };
};

export default useAuth;
