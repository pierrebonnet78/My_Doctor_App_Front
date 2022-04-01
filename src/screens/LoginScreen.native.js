import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import * as Yup from "yup";

import defaultStyles from "../config/styles";
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
    <ImageBackground
      blurRadius={8}
      style={styles.background}
      source={require("../assets/background_native.jpg")}
    >
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
            <Text onPress={() => navigation.navigate("RegisterUser")}>
              Register
            </Text>
          </Text>
          <Text>
            No account ? For doctors :{" "}
            <Text
              style={styles.registerDoctor}
              onPress={() => navigation.navigate("RegisterDoctor")}
            >
              Register
            </Text>
          </Text>
        </View>
      </Form>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  registration: {
    display: "flex",
    flexDirection: "column",
  },
  formHeader: {
    padding: 30,
    borderBottomColor: defaultStyles.colors.light,
    borderBottomWidth: 2,
    width: "75%",
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  formField: {
    padding: 20,
  },
});

export default LoginScreen;