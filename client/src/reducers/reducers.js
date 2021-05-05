import { SET_USER, SET_ROOM } from "../actions/type.js";

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export const roomReducer = (state = "global", action) => {
  switch (action.type) {
    case SET_ROOM:
      return action.payload;
    default:
      return state;
  }
};
