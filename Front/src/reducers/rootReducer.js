import { combineReducers } from "@reduxjs/toolkit";
import pubReducer from "./pubReducer";
import reviewReducer from "./reviewReducer";
import userReservationReducer from "./userReservReducer";

const rootReducer = combineReducers({
  pub: pubReducer,
  userreservation: userReservationReducer,
  review: reviewReducer,
});

export default rootReducer;
