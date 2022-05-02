import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import Text from "../components/Text";
import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
import select from "../components/forms/formsSelectList";
import useAuth from "../auth/useAuth";
import { authentification } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc } from "@firebase/firestore";

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
  seniority: Yup.number().required().label("Year of Seniority").min(1),
  secretWord: Yup.string().required().label("Secret word frothe cabinet"),
  sexe: Yup.object()
    .shape({
      label: Yup.string().required("Test"),
      value: Yup.string().required("Test"),
    })
    .label("Sexe"),
});

function RegisterDoctorScreen({ navigation }) {
  const [error, setError] = useState();
  const auth = useAuth();
  const handleSubmit = (userInfo) => {
    createUserWithEmailAndPassword(
      authentification,
      userInfo.email,
      userInfo.password
    )
      .then((result) => {
        try {
          const docRef = addDoc(collection(db, "doctors"), {
            first_name: userInfo.firstname,
            last_name: userInfo.lastname,
            uid: result.user.uid,
            email: userInfo.email,
            sexe: userInfo.sexe.label,
            secret_word: userInfo.secretWord,
            seniority: userInfo.seniority,
          });
        } catch (error) {
          setError(error.message);
        }
        auth.logIn(result.user);
      })
      .catch((error) => {
        setError(error.message);
      });
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
            sexe: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={setError} />
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
              autoCapitalize="true"
              autoCorrect={false}
              icon="school"
              name="seniority"
              placeholder="Year of Seniority"
              width={defaultStyles.windowWidth}
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="key"
              name="secretWord"
              placeholder="Secret word"
              textContentType="Secret word from the cabinet"
              width={defaultStyles.windowWidth}
            />
            <FormPicker items={select.sexe} name="sexe" placeholder="Sexe" />
          </View>
          <SubmitButton title="Register" />
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
export default RegisterDoctorScreen;
