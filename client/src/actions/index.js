import { SET_USER, SET_ROOM } from "./type.js";
import { getPayloadToken } from "../utility/token.js";

export const setCurrentUser = (token) => {
  return async (dispatch) => {
    let user = getPayloadToken(token);
    dispatch({
      type: SET_USER,
      payload: {
        id: user.id,
        username: user.username
      }
    });
  };
};

export const setRoom = (room) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ROOM,
      payload: room
    });
  };
};
