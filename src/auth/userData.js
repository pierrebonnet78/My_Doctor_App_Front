import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase/config";

const getUserData = async (userId) => {
  const documentSnapshot = await getDoc(doc(db, "users", userId));

  if (documentSnapshot.exists()) {
    console.log("doc snapshot", documentSnapshot.data());
    return documentSnapshot.data();
  }
  return null;
};

export default getUserData;
