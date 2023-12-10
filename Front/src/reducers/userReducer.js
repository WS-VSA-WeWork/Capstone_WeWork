import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../../firebaseConfig";

const db = getFirestore(app);

// 회원정보 저장하기
export const setUserInfo = createAsyncThunk(
  "user/setUserInfo",
  async ({ uid, type, data }) => {
    console.log("uid", uid);
    console.log("type", type);
    console.log("data", data);
    if (type === "사장님") {
      await setDoc(doc(db, "owners", uid), data);
    } else {
      await setDoc(doc(db, "customers", uid), data);
    }
  }
);

// 회원정보 가져오기
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async ({ uid, type }) => {
    if (type === "사장님") {
      const docRef = doc(db, "owners", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
    } else {
      const docRef = doc(db, "customers", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(setUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
