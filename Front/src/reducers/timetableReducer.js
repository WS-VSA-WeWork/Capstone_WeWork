import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  where,
} from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../../firebaseConfig";

const db = getFirestore(app);

export const fetchTimetable = createAsyncThunk(
  "timetable/fetchData",
  async ({ pubName, date }) => {
    const colRef = collection(db, "pubs", pubName, "timeTable");
    const snap = await getDocs(colRef);
    const data = snap.docs.map((doc) => doc.data());

    for (let i = 0; i < data.length; i++) {
      if (data[i].date === date) {
        return data[i].timeslot;
      }
    }
  }
);

const timetableSlice = createSlice({
  name: "timetable",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimetable.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTimetable.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default timetableSlice.reducer;
