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
      })
      .addCase(fetchReservData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReservData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // 불러온 데이터를 상태에 저장
      })
      .addCase(fetchReservData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// 예약 데이터를 불러오는 비동기 함수
export const fetchReservData = createAsyncThunk(
  "reservation/fetchReservData",
  async (queryParam) => {
    // queryParam은 검색 조건을 나타냅니다 (예: userId, pubName)
    const querySnapshot = await getDocs(
      collection(db, "pubReservations"),
      where(...queryParam)
    );
    let reservData = [];
    querySnapshot.forEach((doc) => {
      reservData.push(doc.data());
    });
    return reservData;
  }
);

export default reservationSlice.reducer;
