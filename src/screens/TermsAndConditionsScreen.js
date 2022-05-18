import React from "react";
import { View, StyleSheet, Text } from "react-native";

function TermsAndConditionsScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Terms and Conditions screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
  },
});
export default TermsAndConditionsScreen;
