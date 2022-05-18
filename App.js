import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { navigationRef } from "./src/navigation/rootNavigation";
import navigationTheme from "./src/navigation/navigationTheme";
import { AuthContext, UserDataContext } from "./src/auth/context";
import { getUser } from "./src/auth";
import getUserData from "./src/auth/userData";

const linking = {
  prefixes: ["app://"],
  config: {
    initialRouteName: "Login",
    screens: {
      Home: {
        path: "login",
      },
      RegisterUser: {
        path: "registerUser",
      },
      RegisterDoctor: {
        path: "registerDoctor",
      },
    },
  },
};

function App() {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await getUser();
    if (user) {
      setUser(user);
      const userData = await getUserData(user.sub);
      setUserData(userData);
    }
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <NavigationContainer
          ref={navigationRef}
          theme={navigationTheme}
          linking={linking}
          fallback={<ActivityIndicator color="blue" size="large" />}
        >
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </UserDataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
