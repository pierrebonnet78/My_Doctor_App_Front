import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Avatar } from "react-native-elements";
import useAuth from "../auth/useAuth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
  document,
} from "firebase/firestore";
import { authentification, db } from "../firebase/config";

import { GiftedChat } from "react-native-gifted-chat";

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const { userData } = useAuth();
  const id = route.params.id;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        <View style={{ flex: 1 }}>
          <Button title="back" />
          <Text>This is a text</Text>
        </View>;
      },
    });
    const q = query(
      collection(db, `chats/${id}`, "messages"),
      orderBy("createdAt", "desc")
      // where("user._id", "==", authentification?.currentUser?.uid),
      // where("doctor.uid", "==", doctor.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user } = messages[0];

    addDoc(collection(db, `chats/${id}`, "messages"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: authentification?.currentUser?.uid,
          avatar: userData?.imgUrl,
        }}
      />
    </>
  );
};

export default ChatScreen;
