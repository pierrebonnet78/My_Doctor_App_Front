import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase/config";

const getUserData = async (userId) => {
  const documentSnapshot = await getDoc(doc(db, "users", userId));

  if (documentSnapshot.exists()) {
    return documentSnapshot.data();
  }

  const documentSnapshot2 = await getDoc(doc(db, "doctors", userId));
  if (documentSnapshot2.exists()) {
    return documentSnapshot2.data();
  }
  return null;
};

export default getUserData;
