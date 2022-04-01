import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import defaultStyles from "../config/styles";
import Text from "../components/Text";
import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function LoginScreen({ navigation }) {
  const handleSubmit = () => {
    console.log("Login");
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.loginTitle}>Login</Text>
        </View>
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error="Invalid email and/or password" visible={false} />
          <View style={styles.formField}>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
              width={defaultStyles.windowWidth}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              width={defaultStyles.windowWidth}
            />
          </View>
          <SubmitButton title="Login" />
          <View style={styles.registration}>
            <Text>
              No account ? For users :{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("RegisterUser")}
              >
                Register
              </Text>
            </Text>
            <Text>
              No account ? For doctors :{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("RegisterDoctor")}
              >
                Register
              </Text>
            </Text>
          </View>
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: defaultStyles.colors.secondary,
    overflow: "hidden",
  },
  formContainer: {
    backgroundColor: "#ffffffb9",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  registration: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  formHeader: {
    padding: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    width: "100%",
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  formField: {
    padding: 20,
  },
  link: {
    color: defaultStyles.colors.primary,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
