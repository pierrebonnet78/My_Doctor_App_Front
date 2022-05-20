import { useContext, useEffect } from "react";

import { AuthContext, UserDataContext } from "./context";
import { storeToken, removeToken } from "./index";
import { deleteUser } from "firebase/auth";
import getUserData from "./userData";
import { doc, deleteDoc } from "@firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "../firebase/config";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const { userData, setUserData } = useContext(UserDataContext);

  const logIn = async (user) => {
    setUser(user);
    const userData = await getUserData(user.uid);
    setUserData(userData);
    storeToken(user.accessToken);
  };

  const logOut = () => {
    setUser(null);
    setUserData(null);
    removeToken();
  };

  const deleteUserAccount = async (user) => {
    await deleteDoc(doc(db, "users", user.uid));

    const storage = getStorage();
    const storageref = ref(storage, `photos/${user.uid}/profilePicture`);
    deleteObject(storageref)
      .then(() => {
        console.log("Picture delete from cloud storage");
      })
      .catch((error) => {
        console.log("error deleting picture from could storage", error);
      });

    deleteUser(user)
      .then(() => {
        console.log("user account delete");
      })
      .catch((error) => {
        console.log(error);
      });

    logOut();
  };

  return { user, logOut, logIn, userData, setUserData, deleteUserAccount };
};

export default useAuth;
