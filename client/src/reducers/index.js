import { combineReducers } from "redux";
import { roomReducer, userReducer } from "./reducers.js";
export default combineReducers({
  user: userReducer,
  room: roomReducer
});
