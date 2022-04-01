import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import Text from "../components/Text";
import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
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
  weight: Yup.number().required().label("Weight"),
  height: Yup.number().required().label("Height"),
});

function RegisterUSerScreen({ navigation }) {
  const handleSubmit = () => {
    console.log("Login");
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.loginTitle}>Doctor Registration</Text>
        </View>

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
              autoCapitalize="none"
              autoCorrect={false}
              icon="human-male-height"
              name="height"
              placeholder="Height (Cm)"
              width={defaultStyles.windowWidth}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="weight"
              name="weight"
              placeholder="Weight (Kg)"
              width={defaultStyles.windowWidth}
            />
            <FormPicker
              items={select.blood}
              name="blood"
              placeholder="Blood Group"
            />
            <FormPicker items={select.sexe} name="sexe" placeholder="Sexe" />
          </View>
          <SubmitButton title="Login" />
          <View style={styles.login}>
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
  login: {
    display: "flex",
    flexDirection: "column",
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
export default RegisterUSerScreen;
