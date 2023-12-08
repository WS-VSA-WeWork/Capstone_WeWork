import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  orderBy,
  updateDoc,
} from "@firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import app from "../../firebaseConfig";

const db = getFirestore(app);

// 술집별로 리뷰 불러오기
export const fetchReviewsByPub = createAsyncThunk(
  "review/fetchReviewsByPub",
  async (pubName) => {
    // 시간순으로 정렬
    const col = collection(db, "pubs", pubName, "pubReviews");
    const q = query(col, orderBy("uploadDate", "desc"));
    const Snapshot = await getDocs(q);
    const data = Snapshot.docs.map((doc) => doc.data());
    return data;
  }
);

// 이용자 리뷰 작성 및 수정(uploadDate: timeStamp 추가, reviewId: doc id도 추가)

// 사장님 리뷰 코멘트 및 수정
export const pushReviewComment = createAsyncThunk(
  "review/pushReviewComment",
  async ({ pubName, reviewId, comment }) => {
    await updateDoc(doc(db, "pubs", pubName, "pubReviews", reviewId), {
      reviewComment: comment,
    });

    console.log("리뷰 댓글 업데이트 성공");
    return data;
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
      })
      .addCase(pushReviewComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(pushReviewComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
