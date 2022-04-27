import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AuthNavigator from "./src/navigation/AuthNavigator";
import { navigationRef } from "./src/navigation/rootNavigation";
import navigationTheme from "./src/navigation/navigationTheme";
import AuthContext from "./src/auth/context";
import AccountScreen from "./src/screens/AccountScreen";
import { getUser } from "./src/auth";

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
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await getUser();
    console.log("user is ", user);
    if (user) setUser(user);
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
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        linking={linking}
        fallback={<ActivityIndicator color="blue" size="large" />}
      >
        {user ? <AccountScreen /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
