// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import pubReducer from "./pubReducer";
// Import other reducers as needed

const rootReducer = combineReducers({
  pub: pubReducer,
  // Add other reducers here
});

export default rootReducer;
