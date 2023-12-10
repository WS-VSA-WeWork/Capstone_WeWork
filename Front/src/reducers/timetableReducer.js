import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../../firebaseConfig";

const db = getFirestore(app);

// 술집 별 예약가능 시간 불러오기
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

// 예약 시 예약된 시간 비활성화 및 술집 예약가능여부 변경
export const updateTimetable = createAsyncThunk(
  "timetable/updateData",
  async ({ pubName, date, idx }) => {
    // 예약된 인덱스 사이의 값들에 대해서만 예약 불가능으로 변경
    const timeTableDocRef = doc(db, "pubs", pubName, "timeTable", date);

    const timeTableSnapshot = await getDoc(timeTableDocRef);
    const timeTableData = timeTableSnapshot.data();

    if (idx[1] === -1) {
      idx[1] = timeTableData.timeslot.length;
    }
    for (let i = idx[0]; i < idx[1]; i++) {
      timeTableData.timeslot[i].available = false;
    }

    await updateDoc(timeTableDocRef, {
      timeslot: timeTableData.timeslot,
    });

    // 예약이 모두 차있다면 availablePubs에서 booked를 full로 변경
    let cnt = 0;
    for (let i = 0; i < timeTableData.timeslot.length; i++) {
      if (timeTableData.timeslot[i].available === true) {
        cnt += 1;
        break;
      }
    }

    if (cnt === 0) {
      const pubDocRef = doc(db, "availablePubs", date, "pubName", pubName);
      await updateDoc(pubDocRef, {
        booked: "full",
      });
    }

    return timeTableData.timeslot;
  }
);

const pushTimetable = createAsyncThunk(
  "timetable/pushTimetable",
  async ({ pubName, openHours }) => {
    const splitTimes = openHours.split(" - ");
    const startTime = splitTimes[0];
    const endTime = splitTimes[1];
    const formatTime = (hour, minute) =>
      `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    const startDate = new Date(`2000-01-01 ${startTime}`);
    const endDate = new Date(`2000-01-01 ${endTime}`);

    // Calculate the number of half-hour intervals
    const numberOfIntervals = (endDate - startDate) / (30 * 60 * 1000);

    const timeslot = Array.from({ length: numberOfIntervals }, (_, index) => {
      const currentTime = new Date(
        startDate.getTime() + index * 30 * 60 * 1000
      );
      const label = formatTime(
        currentTime.getHours(),
        currentTime.getMinutes()
      );
      return {
        available: true,
        label: label,
      };
    });

    console.log(timeslot);

    for (let i = 1; i <= 31; i++) {
      const day = i.toString().padStart(2, "0");
      const date = `2023-12-${day}`;

      await setDoc(doc(db, "pubs", pubName, "timetable", date), {
        date: date,
        timeslot: timeslot,
      });
    }

    return data;
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
      })
      .addCase(updateTimetable.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateTimetable.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(pushTimetable.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(pushTimetable.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default timetableSlice.reducer;
