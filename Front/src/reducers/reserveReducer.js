import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  where,
} from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../../firebaseConfig";

const db = getFirestore(app);

export const pushReservData = createAsyncThunk(
  "reservation/fetchData",
  async ({ userId, pubName, data }) => {
    await setDoc(doc(db, "myReservations", userId), data);
    await setDoc(doc(db, "pubReservations", pubName), data);
  }
);

const reservationSlice = createSlice({
  name: "timetable",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pushReservData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(pushReservData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reservationSlice.reducer;
