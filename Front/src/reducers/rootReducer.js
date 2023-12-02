import { combineReducers } from "@reduxjs/toolkit";
import pubReducer from "./pubReducer";
import reviewReducer from "./reviewReducer";
import timetableReducer from "./timetableReducer";
import userReservationReducer from "./userReservationReducer";

const rootReducer = combineReducers({
  pub: pubReducer,
  review: reviewReducer,
  timetable: timetableReducer,
  userreservation: userReservationReducer,
});

export default rootReducer;
