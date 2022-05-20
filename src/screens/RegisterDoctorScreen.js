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
import { db, defaultProfileImageUrl } from "../firebase/config";
import { setDoc, doc } from "@firebase/firestore";

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
  doctorSpeciality: Yup.string().required().label("Doctor speciality"),
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
    ).then(async (result) => {
      setDoc(doc(db, "doctors", result.user.uid), {
        first_name: userInfo.firstname,
        last_name: userInfo.lastname,
        uid: result.user.uid,
        email: userInfo.email,
        sexe: userInfo.sexe.label,
        doctorSpeciality: userInfo.doctorSpeciality,
        seniority: userInfo.seniority,
        imgUrl: defaultProfileImageUrl,
      });
      auth.logIn(result.user);
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
            doctorSpeciality: "",
            sexe: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
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
              autoCapitalize="words"
              autoCorrect={false}
              icon="school"
              name="seniority"
              placeholder="Year of Seniority"
              width={defaultStyles.windowWidth}
            />
            <FormField
              autoCapitalize="words"
              autoCorrect={false}
              icon="key"
              name="doctorSpeciality"
              placeholder="Doctor speciality"
              textContentType="Doctor speciality"
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
    fontSize: 2,
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
