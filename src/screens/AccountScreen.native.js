import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native-elements";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import useAuth from "../auth/useAuth";
import { updateDoc, doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase/config";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";

function AccountScreen({ navigation }) {
  const { logOut, userData, user, deleteUserAccount } = useAuth();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    let imageUrl = await uploadImage(userData.uid);

    if (userData.doctorSpeciality) {
      updateDoc(doc(db, "doctors", userData.uid), {
        imgUrl: imageUrl,
      });
    } else {
      updateDoc(doc(db, "users", userData.uid), {
        imgUrl: imageUrl,
      });
    }
  };

  const uploadImage = async () => {
    if (image == null) {
      console.log("image is null");
      return null;
    }

    const uploadUri = image;

    let filename = userData.uid + "/profilePicture";

    const storage = getStorage();
    const storageRef = ref(storage, `photos/${filename}`);

    setLoading(true);

    const img = await fetch(uploadUri);
    const bytes = await img.blob();

    const snapshot = await uploadBytes(storageRef, bytes);
    const photoURL = await getDownloadURL(storageRef);

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
      setImage(result.uri.toString());
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const createRemoveAccountAlert = () => {
    Alert.alert(
      "Remove Account",
      "Are you sure you want to remove your account ?",
      [
        {
          text: "No",
        },
        {
          text: "Delete my Account",
          onPress: () => {
            deleteUserAccount(user);
          },
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <TouchableOpacity onPress={choosePhotoFromLibrary} disabled={loading}>
          <Image
            source={{
              uri: image
                ? image
                : userData
                ? userData.imgUrl
                : "https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Photo.png",
            }}
            style={styles.imageBackground}
          />
        </TouchableOpacity>
        {image ? (
          <Button title={"Update"} onPress={handleUpdate} disabled={loading} />
        ) : null}

        <View style={styles.name}>
          {userData ? (
            <Text style={{ fontWeight: "bold" }}>
              {userData.first_name} {userData.last_name}
            </Text>
          ) : (
            <Text style={{ fontWeight: "bold" }}>{user.email}</Text>
          )}
        </View>
      </View>
      <View style={styles.accountSettings}>
        <View>
          <ListItem
            title={"Notifications"}
            IconComponent={
              <Icon name={"alarm-light-outline"} backgroundColor={"#2573D9"} />
            }
          />
          <ListItem
            title={"Privacy"}
            IconComponent={
              <Icon name={"information-outline"} backgroundColor={"#3D90D9"} />
            }
          />
          <ListItem
            title={"Security"}
            IconComponent={
              <Icon name={"security"} backgroundColor={"#5DBF17"} />
            }
          />
          <ListItem
            title={"Terms of use"}
            IconComponent={
              <Icon
                name={"clipboard-file-outline"}
                backgroundColor={"#F29F05"}
              />
            }
          />
        </View>
        <View>
          <ListItem
            title={"LogOut"}
            IconComponent={<Icon name={"logout"} backgroundColor={"purple"} />}
            onPress={logOut}
          />
          <ListItem
            title={"Delete Account"}
            IconComponent={
              <Icon
                name={"account-remove-outline"}
                backgroundColor={"#F21905"}
              />
            }
            onPress={createRemoveAccountAlert}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flex: 1,
    alignItems: "center",
  },
  imageBackground: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  profilePicture: {
    borderRadius: 50,
  },
  upper: {
    padding: 20,
  },
  name: {
    alignItems: "center",
    padding: 10,
  },
  accountSettings: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
    justifyContent: "space-around",
  },
});
export default AccountScreen;
