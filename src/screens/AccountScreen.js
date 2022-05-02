import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

import useAuth from "../auth/useAuth";

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <View style={styles.container}>
      {/*}
      <Text> name : {user.name} </Text>
      <Text> email : {user.email} </Text>
      <Text> firstname : {user.firstname}</Text>
      <Text> sexe : {user.sexe.label} </Text>
      */}
      <Text> You are logged in</Text>
      <Button
        title="Log out"
        onPress={() => {
          logOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});
export default AccountScreen;
