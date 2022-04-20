import React from "react";
import { View, StyleSheet, Platform, ImageBackground } from "react-native";
import * as Yup from "yup";

import Text from "../components/Text";
import defaultStyles from "../config/styles";
import select from "../components/forms/formsSelectList";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
  FormPicker,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  firstname: Yup.string().required().label("Fist Name"),
  lastname: Yup.string().required().label("Last Name"),
  seniority: Yup.number().required().label("Year of Seniority"),
  secretWord: Yup.string().required().label("Secret word frothe cabinet"),
});

function RegisterScreenDoctor({ navigation }) {
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
        initialValues={{
          email: "",
          password: "",
          firstname: "",
          lastname: "",
          seniority: "",
          secretWord: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Error" visible={false} />

        <View style={styles.formField}>
          <FormField
            autoCapitalize="true"
            autoCorrect={false}
            icon="account"
            name="firstname"
            placeholder="FirstName"
            textContentType="name"
            width={defaultStyles.windowWidth}
          />
          <FormField
            autoCapitalize="true"
            autoCorrect={false}
            icon="account"
            name="lastname"
            placeholder="LastName"
            textContentType="familyName"
            width={defaultStyles.windowWidth}
          />
          <FormPicker items={select.sexe} name="sexe" placeholder="Sexe" />
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
          <FormField
            autoCapitalize="true"
            autoCorrect={false}
            icon="school"
            name="name"
            placeholder="Year of Seniority"
            width={defaultStyles.windowWidth}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="key"
            name="SecretWord"
            placeholder="Secret word from the cabinet"
            width={defaultStyles.windowWidth}
          />
        </View>
        <SubmitButton title="Login" />
        <View style={styles.registration}>
          <Text>
            Already have an account ?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              LogIn
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

export default RegisterScreenDoctor;
