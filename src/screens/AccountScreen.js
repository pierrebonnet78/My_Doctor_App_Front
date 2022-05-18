import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "@firebase/storage";
import useAuth from "../auth/useAuth";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase/config";

function AccountScreen({ navigation }) {
  const { user, logOut, userData } = useAuth();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    let imageUrl = await uploadImage(user.user_id);
    console.log(imageUrl);

    if (imageUrl == null && userData.imgUrl) {
      imageUrl = userData.imgUrl;
    }
    updateDoc(doc(db, "users", user.user_id), {
      imgUrl: imageUrl,
    }).then(() => {
      console.log("picture updated ");
    });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }

    const uploadUri = image;
    console.log("upload uri is ", uploadUri);
    console.log("user is");
    let filename = user.user_id + "/profilePicture";

    const storage = getStorage();
    const storageRef = ref(storage, `photos/${filename}`);

    setLoading(true);

    const snapshot = await uploadString(storageRef, uploadUri, "data_url");
    const photoURL = await getDownloadURL(storageRef);

    console.log("photoUrl is ", photoURL);

    setLoading(false);
    setImage(null);
    return photoURL;
  };

  const choosePhotoFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      setImage(result.uri);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <View style={styles.container}>
      {userData.imgUrl != "null" ? (
        <Avatar.Image source={{ uri: userData.imgUrl }} />
      ) : (
        <Avatar.Text
          label={userData.first_name.charAt(0) + userData.last_name.charAt(0)}
        ></Avatar.Text>
      )}

      <View style={styles.name}>
        {userData != "null" ? (
          <Text style={{ fontWeight: "bold" }}>
            {userData.first_name} {userData.last_name}
          </Text>
        ) : (
          <Text style={{ fontWeight: "bold" }}>{user.email}</Text>
        )}
      </View>

      <Button title="Choose Image" onPress={choosePhotoFromLibrary}></Button>
      <Button disabled={loading} title="Update" onPress={handleUpdate}></Button>
      <Button
        title="Log out"
        onPress={() => {
          logOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});
export default AccountScreen;
