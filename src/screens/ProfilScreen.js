import React from "react";
import { View, StyleSheet, Text } from "react-native";

function ProfilScreen() {
  return (
    <View style={styles.container}>
      <Text>Profil Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
});
export default ProfilScreen;
