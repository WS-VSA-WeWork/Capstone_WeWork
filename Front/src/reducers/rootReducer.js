import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import pubReducer from "./pubReducer";
import reservationReducer from "./reservationReducer";
import reviewReducer from "./reviewReducer";
import timetableReducer from "./timetableReducer";

const rootReducer = combineReducers({
  user: userReducer,
  pub: pubReducer,
  review: reviewReducer,
  timetable: timetableReducer,
  reservation: reservationReducer,
});

export default rootReducer;
