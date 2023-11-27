// reducers/pubReducer.js
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../../firebaseConfig";

const db = getFirestore(app);

// Firestore에서 데이터 가져오기
export const fetchPubData = createAsyncThunk("pub/fetchData", async () => {
  const pubsCollection = collection(db, "pubs");
  const pubsSnapshot = await getDocs(pubsCollection);
  const pubs = pubsSnapshot.docs.map((doc) => doc.data());
  return pubs;
});

const pubSlice = createSlice({
  name: "pub",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPubData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPubData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPubData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pubSlice.reducer;
