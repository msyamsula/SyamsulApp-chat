import axios from "axios";
import { prepareHeaderConfig } from "./token";

export const getAllUser = async (token) => {
  let config = prepareHeaderConfig(token);
  const url = `${process.env.REACT_APP_SIGNIN_SERVER}/users`;

  let resp = {};
  try {
    let beResp = await axios.get(url, config);
    return beResp.data;
  } catch (error) {
    resp.status = 500;
    resp.message = error;
    return resp;
  }
};
