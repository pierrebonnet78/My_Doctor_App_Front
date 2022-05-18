import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import * as Yup from "yup";

import defaultStyles from "../config/styles";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import Text from "../components/Text";
import useAuth from "../auth/useAuth";
import { authentification } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const auth = useAuth();

  const handleSubmit = ({ email, password }) => {
    signInWithEmailAndPassword(authentification, email, password)
      .then((result) => {
        auth.logIn(result.user);
      })
      .catch((error) => {
        setLoginFailed(true);
      });
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
        <ErrorMessage
          error="Invalid email and/or password"
          visible={loginFailed}
        />

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
          <View style={styles.registerDoctor}>
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
    paddingTop: 15,
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
  registerDoctor: {
    paddingTop: 20,
  },
  link: {
    textDecorationLine: "underline",
    color: colors.primary,
  },
});

export default LoginScreen;
