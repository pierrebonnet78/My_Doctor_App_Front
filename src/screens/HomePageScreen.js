import React from "react";
import { View, StyleSheet, Text } from "react-native";

function HomePageScreen(props) {
  return (
    <View style={styles.container}>
      <Text> This is the Home Page </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
});
export default HomePageScreen;
