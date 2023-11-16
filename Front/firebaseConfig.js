import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5sNj5vAbEKSBESkHdJXIXq85Jaahr78c",
  authDomain: "wework-back-default-rtdb.asia-southeast1.firebasedatabase.app",
  databaseURL:
    "https://wework-back-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wework-back",
  storageBucket: "wework-back.appspot.com",
  messagingSenderId: "494469542541",
  appId: "1:494469542541:android:3f2db53730b21855ef68c4",
  // measurementId: "G-2ZQZQZQZQZ"
};
const app = initializeApp(firebaseConfig);

export { app };
