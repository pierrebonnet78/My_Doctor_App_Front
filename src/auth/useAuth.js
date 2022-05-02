import { useContext } from "react";

import AuthContext from "./context";
import { storeToken, removeToken } from "./index";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (user) => {
    setUser(user);
    storeToken(user.accessToken);
  };

  const logOut = () => {
    setUser(null);
    removeToken();
  };

  return { user, logOut, logIn };
};

export default useAuth;
