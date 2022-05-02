import { authentification } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/config";
import { collection, addDoc } from "@firebase/firestore";

const users = (userInfo) => {
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
      } catch (error) {
        //setError(error.message);
      }
    })
    .catch((error) => {
      //setError(error.message);
    });
};

export default users;
