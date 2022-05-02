import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import Text from "../components/Text";
import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
import select from "../components/forms/formsSelectList";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import { authentification } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/config";
import { collection, addDoc } from "@firebase/firestore";

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
  FormPicker,
} from "../components/forms";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("Fist Name"),
  lastname: Yup.string().required().label("Last Name"),
  weight: Yup.number().required().label("Weight"),
  height: Yup.number().required().label("Height"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
  sexe: Yup.object({
    label: Yup.string().required(),
    value: Yup.number().required(),
  }).label("Sexe"),
  blood: Yup.object({
    label: Yup.string(),
    value: Yup.number(),
  }).label("Blood group"),
});

function RegisterUserScreen({ navigation }) {
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
          const docRef = addDoc(collection(db, "users"), {
            first_name: userInfo.firstname,
            last_name: userInfo.lastname,
            uid: result.user.uid,
            email: userInfo.email,
            weight: userInfo.weight,
            height: userInfo.height,
            blood_group: userInfo.blood.label,
            sexe: userInfo.sexe.label,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          setError(error.message);
        }
        auth.logIn(result.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  /* a finir de dev avec une Promise
  const handleSubmit = async (userInfo) => {
    const user = await usersApi(userInfo, auth);
    console.log(user);
    auth.logIn(user);
  }; */
  return (
    <Screen style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.loginTitle}>User Registration</Text>
        </View>

        <Form
          initialValues={{
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            height: "",
            weight: "",
            blood: "",
            sexe: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <ErrorMessage error={error} visible={setError} />
          <View style={styles.formField}>
            <FormField
              autoCapitalize="words"
              autoCorrect={false}
              icon="account"
              name="firstname"
              placeholder="FirstName"
              textContentType="name"
              width={defaultStyles.windowWidth}
            />

            <FormField
              autoCapitalize="words"
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
    flex: 1,
  },
  link: {
    color: defaultStyles.colors.primary,
    textDecorationLine: "underline",
  },
  errorMessage: {
    alignItems: "stretch",
    flexGrow: 0,
  },
});
export default RegisterUserScreen;
