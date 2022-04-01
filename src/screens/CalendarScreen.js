import React from "react";
import { View, StyleSheet, Text } from "react-native";

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text>Calendar Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
});
export default CalendarScreen;
