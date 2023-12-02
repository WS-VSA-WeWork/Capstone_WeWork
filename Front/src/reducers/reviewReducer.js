import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  orderBy,
} from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../../firebaseConfig";

const db = getFirestore(app);

export const fetchReviewsByPub = createAsyncThunk(
  "review/fetchReviewsByPub",
  async (pubName) => {
    // pubReviews 컬렉션을 pubs 컬렉션 안에 넣었을 때의 코드
    // 시간순으로 정렬
    const col = collection(db, "pubs", pubName, "pubReviews");
    const q = query(col, orderBy("uploadDate", "desc"));
    const Snapshot = await getDocs(q);
    const data = Snapshot.docs.map((doc) => doc.data());
    return data;

    // pubReviews 컬렉션 따로 뒀을 때의 코드
    // const DocRef = doc(db, "pubReviews", pubName);
    // const Snapshot = await getDoc(DocRef);

    // if (Snapshot.exists()) {
    //   return Snapshot.data();
    // } else {
    //   return null;
    // }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByPub.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchReviewsByPub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
