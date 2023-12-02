import { combineReducers } from "@reduxjs/toolkit";
import pubReducer from "./pubReducer";
import reserveReducer from "./reserveReducer";
import reviewReducer from "./reviewReducer";
import timetableReducer from "./timetableReducer";
import userReservationReducer from "./userReservationReducer";

const rootReducer = combineReducers({
  pub: pubReducer,
  review: reviewReducer,
  timetable: timetableReducer,
  reservation: reserveReducer,
  userreservation: userReservationReducer,
});

export default rootReducer;
