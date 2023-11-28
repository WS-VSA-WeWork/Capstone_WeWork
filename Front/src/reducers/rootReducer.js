import { combineReducers } from "@reduxjs/toolkit";
import pubReducer from "./pubReducer";
import userReservationReducer from "./userReservationReducer";

const rootReducer = combineReducers({
  pub: pubReducer,
  userreservation: userReservationReducer,
});

export default rootReducer;
