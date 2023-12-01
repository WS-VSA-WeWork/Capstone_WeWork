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

export const fetchPubsData = createAsyncThunk("pub/fetchData", async () => {
  const pubsCollection = collection(db, "pubs");
  const pubsSnapshot = await getDocs(pubsCollection);
  const pubs = pubsSnapshot.docs.map((doc) => doc.data());
  return pubs;
});

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

const pubSlice = createSlice({
  name: "pub",
  initialState: { data: [], selectedPub: [], status: "idle", error: null },
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
      .addCase(fetchPubDataByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPub = action.payload;
      })
      .addCase(fetchPubDataByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pubSlice.reducer;
