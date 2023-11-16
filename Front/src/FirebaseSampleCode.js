import React from "react";
import app from "../../firebaseConfig.js";
import { collection, getDocs, getFirestore } from "firebase/firestore";
function FirebaseSampleCode() {
  const db = getFirestore(app);
  console.log(db);

  const getPubs = async () => {
    const pubCol = collection(db, "pubs");
    const pubSnapshot = await getDocs(pubCol);
    const pubList = pubSnapshot.docs.map((doc) => doc.data());
    console.log(pubList);
    console.log(pubList[0]["description"]);
  };
  getPubs();

  return <div>FirebaseSampleCode</div>;
}

export default FirebaseSampleCode;
