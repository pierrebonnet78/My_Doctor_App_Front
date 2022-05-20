import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import * as Yup from "yup";

import Text from "../components/Text";
import defaultStyles from "../config/styles";
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
import colors from "../config/colors";

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

function RegisterScreenDoctor({ navigation }) {
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
    <ImageBackground
      blurRadius={8}
      style={styles.background}
      source={require("../assets/background_native.jpg")}
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        keyboardOpeningTime={0}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        contentInsetAdjustmentBehavior="automatic"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        extraScrollHeight={50}
      >
        <View style={styles.container}>
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
                keyboardType="number-pad"
                placeholder="Year of Seniority"
                width={defaultStyles.windowWidth}
              />
              <FormField
                autoCapitalize="words"
                autoCorrect={false}
                icon="key"
                name="doctorSpeciality"
                placeholder="Doctor speciality"
                width={defaultStyles.windowWidth}
              />
              <KeyboardAwareScrollView
                horizontal={true}
                bounces={false}
                scrollEnabled={false}
              >
                <View style={styles.picker}>
                  <FormPicker
                    items={select.sexe}
                    name="sexe"
                    placeholder="Sexe"
                  />
                </View>
              </KeyboardAwareScrollView>
              <View style={styles.submitButton}>
                <SubmitButton title="Register" />
              </View>
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
            </View>
          </Form>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  picker: {
    flex: 1,
  },
  login: {
    display: "flex",
    alignItems: "center",
  },
  submitButton: {
    paddingTop: 20,
  },
  link: {
    textDecorationLine: "underline",
  },
});

export default RegisterScreenDoctor;
