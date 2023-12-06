import {
  arrayUnion,
  addDoc,
  collection,
  doc,
  query,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../../firebaseConfig";

const db = getFirestore(app);

// 예약 발생 시 예약자의 예약 DB와 사장님의 db에 예약 정보 추가
export const pushReservationData = createAsyncThunk(
  "reservation/pushData",
  async ({ userId, pubName, data }) => {
    // 예약자의 예약 DB에 예약 정보 및 시간 추가
    const userdata = { ...data, updatedAt: serverTimestamp() };
    const docref = await addDoc(
      collection(db, "myReservations", userId, "reservations"),
      userdata
    );

    // 예약 document에 reservation Id 추가
    const documentId = docref.id;
    await updateDoc(
      doc(db, "myReservations", userId, "reservations", documentId),
      {
        reservationId: documentId,
      }
    );

    // 술집 예약 DB에 예약 정보, reservation id 및 시간 추가
    const pubdata = {
      ...data,
      reservationId: documentId,
      updatedAt: serverTimestamp(),
    };
    await setDoc(
      doc(db, "pubReservations", pubName, "reservations", documentId),
      pubdata
    );

    console.log("예약 정보 push 성공");
    return data;
  }
);

// 사용자 페이지에서 예약 내역 불러오기
export const fetchReservationDataByUserId = createAsyncThunk(
  "reservation/fetchReservationDataByUserId",
  async ({ userId }) => {
    const colref = collection(db, "myReservations", userId, "reservations");
    const q = query(colref, orderBy("updatedAt", "desc"));
    const docref = await getDocs(q);
    const snap = docref.docs.map((doc) => doc.data());
    console.log(snap);
    return snap;
  }
);

// 사장님 페이지에서 예약 내역 불러오기
export const fetchReservationDataByPubName = createAsyncThunk(
  "reservation/fetchReservationDataByPubName",
  async (pubName) => {
    const colref = collection(db, "pubReservations", pubName, "reservations");
    const docref = await getDocs(colref);
    const snap = docref.docs.map((doc) => doc.data());
    console.log(snap);
    return snap;
  }
);

// 특정 예약 데이터 날짜별로 불러오기 (사장님 페이지)
export const fetchPubReservationByDate = createAsyncThunk(
  "reservation/fetchPubReservationByDate",
  async ({ pubName, date }) => {
    const colref = collection(db, "pubReservations", pubName, "reservations");
    const docref = await getDocs(colref);
    const snap = docref.docs.map((doc) => doc.data());
    console.log(snap);

    //filter
    const filteredSnap = snap.filter((data) => data.reservDate === date);
    console.log(filteredSnap);
    if (filteredSnap.length === 0) {
      return null;
    }
    return filteredSnap;
  }
);

// update specific reservation data

const reservationSlice = createSlice({
  name: "reservation",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pushReservationData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(pushReservationData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchReservationDataByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchReservationDataByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchReservationDataByPubName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchReservationDataByPubName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPubReservationByDate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPubReservationByDate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reservationSlice.reducer;
