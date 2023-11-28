import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../../firebaseConfig";

const db = getFirestore(app);

export const fetchUserReservationData = createAsyncThunk(
  "userreservation/fetchData",
  async (userId) => {
    const userReservationRef = doc(db, "myReservations", userId);
    const userReservationSnap = await getDoc(userReservationRef);

    if (userReservationSnap.exists()) {
      return userReservationSnap.data();
    } else {
      return null;
    }
  }
);

export const postUserReservationData = createAsyncThunk(
  "userreservation/postData",
  async () => {
    const reservationsCollection = collection(db, "userReservations");
    await addDoc(reservationsCollection, newData);
    return newData;
  }
);

export const updateUserReservationData = createAsyncThunk(
  "userreservation/updateData",
  async () => {
    const reservationsDocRef = doc(db, "userReservations", docId);
    await updateDoc(reservationsDocRef, newData);
    return newData;
  }
);

const userReservationSlice = createSlice({
  name: "userreservation",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReservationData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserReservationData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postUserReservationData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(postUserReservationData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserReservationData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateUserReservationData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userReservationSlice.reducer;
