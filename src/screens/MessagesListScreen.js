import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Avatar } from "react-native-elements";
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

import ListItem from "../components/ListItem";
import { authentification, db } from "../firebase/config";
import useAuth from "../auth/useAuth";

const MessagesListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { userData } = useAuth();

  /*
  useEffect(
    () =>
      onSnapshot(
        collection(db, "chats"),
        //where("userName", "!=", authentification?.currentUser?.uid),
        orderBy("doctor", "asc"),
        (snapshot) => {
          setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      ),
    []
  );
  */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (userData.doctorSpeciality) {
      console.log("oui");
      var q = query(
        collection(db, "chats"),
        where("doctor", "==", authentification.currentUser.uid)
      );
    } else {
      var q = query(
        collection(db, "chats"),
        where("user", "==", authentification.currentUser.uid)
      );
    }
    const tempChats = [];
    const querySnapshot = await getDocs(q);
    var i = 0;
    querySnapshot.forEach((doc) => {
      tempChats.push(doc.data());
      tempChats[i].id = doc.id;
      i++;
    });
    setChats(tempChats);
    console.log(chats);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    });
  }, [navigation]);

  const enterChat = (id) => {
    navigation.navigate("Chat", {
      id: id,
      name: "Custom",
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      {userData.doctorSpeciality ? (
        <ScrollView style={styles.container}>
          {chats.map(({ id, userName }) => (
            <ListItem onPress={() => enterChat(id)} title={userName} key={id} />
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.container}>
          {chats.map(({ id, doctorName }) => (
            <ListItem
              onPress={() => enterChat(id)}
              title={doctorName}
              key={id}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MessagesListScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
