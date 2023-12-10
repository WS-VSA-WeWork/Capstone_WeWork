import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
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

// 특정 술집 데이터 가져오기
export const fetchPubDataByName = createAsyncThunk(
  "pub/fetchPubDataByName",
  async (pubName) => {
    const pubDocRef = doc(db, "pubs", pubName);
    const pubSnapshot = await getDoc(pubDocRef);
    if (pubSnapshot.exists()) {
      return pubSnapshot.data();
    } else {
      return null;
    }
  }
);

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

// 이미지 업로드하기
export const pushPubImages = createAsyncThunk(
  "pub/pushPubImages",
  async({pubName, imageUris}) => {
    await updateDoc(doc(db, "pubs", pubName), {
      pubImages: imageUris,
    });
  }
)

export const pushAvailablePubsData = createAsyncThunk(
  "pub/pushAvailablePubsData",
  async ({pubName, maxSeats, timeSlots}) => {
    for (let i = 10; i <= 15; i++) {
      const day = i.toString().padStart(2, "0");
      const date = `2023-12-${day}`;

      await setDoc(doc(db, "availablePubs", date, "pubName", pubName), {
        booked: "available",
        maxSeats: maxSeats,
        pubName: pubName,
      });
      
    await setDoc(doc(db, "pubs", pubName, "timeTable", date), {
      date: date,
      timeslot: timeSlots,
    });
    }
    return timeSlots;
  }
);

export const pushPubData = createAsyncThunk(
  "pub/pushPubData",
  async ({ pubName, data }) => {
    await setDoc(doc(db, "pubs", pubName), data);
    return data;
  }
);

export const updatePubData = createAsyncThunk(
  "pub/updatePubData",
  async ({ pubName, data }) => {
    // console.log(pubName, data);
    await updateDoc(doc(db, "pubs", pubName), data);
    return data;
  }
);

const pubSlice = createSlice({
  name: "pub",
  initialState: { data: [], myPub: [], status: "idle", error: null },
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
      .addCase(fetchPubsData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAvailablePubsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAvailablePubsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(pushAvailablePubsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(pushAvailablePubsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPubDataByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myPub = action.payload;
      })
      .addCase(fetchPubDataByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePubData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myPub = action.payload;
      })
      .addCase(pushPubData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pubSlice.reducer;
