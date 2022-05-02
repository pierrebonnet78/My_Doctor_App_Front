import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Text from "../components/Text";
import defaultStyles from "../config/styles";
import select from "../components/forms/formsSelectList";
import useAuth from "../auth/useAuth";
import { authentification } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    label: Yup.string().required(),
    value: Yup.number().required(),
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
              height: "",
              weight: "",
              blood: "",
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
                autoCapitalize="none"
                autoCorrect={false}
                icon="human-male-height"
                name="height"
                keyboardType="number-pad"
                placeholder="Height (Cm)"
                width={defaultStyles.windowWidth}
              />

              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="weight"
                name="weight"
                keyboardType="number-pad"
                placeholder="Weight (Kg)"
                width={defaultStyles.windowWidth}
              />
              <KeyboardAwareScrollView
                horizontal={true}
                bounces={false}
                scrollEnabled={false}
              >
                <View style={styles.picker}>
                  <FormPicker
                    items={select.blood}
                    name="blood"
                    placeholder="Blood Group"
                    icon="human-male-height"
                  />
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
                    Login
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
});
export default RegisterUserScreen;
