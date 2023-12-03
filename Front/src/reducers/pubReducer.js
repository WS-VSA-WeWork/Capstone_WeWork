import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../../firebaseConfig";

const db = getFirestore(app);

// 모든 술집 데이터 가져오기
export const fetchPubsData = createAsyncThunk("pub/fetchPubsData", async () => {
  const pubsCollection = collection(db, "pubs");
  const pubsSnapshot = await getDocs(pubsCollection);
  const pubs = pubsSnapshot.docs.map((doc) => doc.data());
  return pubs;
});

// 날짜와 인원에 따른 예약 가능한 술집 데이터 가져오기
export const fetchAvailablePubsData = createAsyncThunk(
  "pub/fetchAvailablePubsData",
  async ({ date, numberOfPeople }) => {
    const col = collection(db, "availablePubs", date, "pubName");
    const docref = await getDocs(col);
    const data = docref.docs.map((doc) => doc.data());

    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].booked === "available" && numberOfPeople < data[i].maxSeats) {
        const pubsCollection = collection(db, "pubs");
        const pubsSnapshot = await getDocs(pubsCollection);
        const pubs = pubsSnapshot.docs.map((doc) => doc.data());

        // if문에 해당하는 pubName만 pub collection에서 가져오기
        for (let j = 0; j < pubs.length; j++) {
          if (pubs[j].pubName === data[i].pubName) {
            arr.push(pubs[j]);
          }
        }
      }
    }
    // console.log(arr);
    return arr;
  }
);

const pubSlice = createSlice({
  name: "pub",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPubsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPubsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAvailablePubsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAvailablePubsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pubSlice.reducer;
