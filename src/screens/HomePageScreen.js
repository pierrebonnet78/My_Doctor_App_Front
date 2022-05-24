import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import colors from "../config/colors";
import { Image } from "react-native-elements";
import useAuth from "../auth/useAuth";

function HomePageScreen({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedValue, setSelectedValue] = useState(false);
  const { userData } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const createChat = async () => {
    const id_doc = selectedValue.uid + userData?.uid;
    console.log(id_doc);
    const ref = setDoc(doc(db, "chats", id_doc), {
      user: userData?.uid,
      doctor: selectedValue.uid,
      doctorName: selectedValue.first_name + " " + selectedValue.last_name,
      userName: userData?.first_name + " " + userData?.last_name,
    }).then(() => navigation.navigate("Messages", { screen: "ChatList" }));
  };

  const fetchData = async () => {
    const q = query(collection(db, "doctors"));
    const tempDoctor = [];
    const querySnapshot = await getDocs(q);
    var i = 0;
    querySnapshot.forEach((doc) => {
      tempDoctor.push(doc.data());
      tempDoctor[i].title =
        doc.data().first_name +
        " " +
        doc.data().last_name +
        " | " +
        doc.data().doctorSpeciality;
      tempDoctor[i].id = i;
      i++;
    });
    setDoctors(tempDoctor);
    //setDoctors(people);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <AutocompleteDropdown
            colo
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            initialValue={"1"}
            onSelectItem={setSelectedValue}
            dataSet={doctors}
            textInputProps={{
              placeholder: "Search here",
              style: {
                backgroundColor: "white",
                borderRadius: 5,
              },
            }}
            rightButtonsContainerStyle={{
              backgroundColor: "white",
            }}
            inputContainerStyle={{
              backgroundColor: "white",
              borderRadius: 5,
            }}
          />
        </View>
        {selectedValue ? (
          <View style={styles.doctor}>
            <View style={styles.description}>
              <Image
                source={{
                  uri: selectedValue
                    ? selectedValue.imgUrl
                    : "https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Photo.png",
                }}
                style={styles.imageBackground}
                imageStyle={styles.profilePicture}
              />

              <View style={styles.infos}>
                <Text>
                  Doctor Name : {selectedValue.first_name}{" "}
                  {selectedValue.last_name}
                </Text>
                <Text>Speciality : {selectedValue.doctorSpeciality}</Text>
                <Text>Sexe : {selectedValue.sexe}</Text>
                <Text>Seniority : {selectedValue.seniority} years</Text>
              </View>
            </View>
            <View style={styles.contact}>
              <Button
                title="Send a message"
                onPress={() => {
                  //navigation.navigate("Chat", selectedValue);
                  createChat();
                }}
              />
              <Button
                title="See agenda"
                onPress={() => {
                  navigation.navigate("Appointment");
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contact: {
    marginTop: "10%",
  },
  description: {
    flexDirection: "row",
  },
  infos: {
    alignSelf: "center",

    paddingLeft: "10%",
  },
  doctor: {
    padding: 20,
    flex: 0,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: colors.low,
    padding: 16,
    paddingTop: "10%",
    zIndex: 2,
    paddingBottom: "10%",
  },
  imageBackground: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
export default HomePageScreen;
