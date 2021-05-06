import axios from "axios";
import { output } from "./output";
import { prepareHeaderConfig } from "./token";

export const getAllUser = async (token) => {
  let config = prepareHeaderConfig(token);
  const url = `${process.env.REACT_APP_SIGNIN_SERVER}/users`;

  try {
    let beResp = await axios.get(url, config);
    return beResp.data;
  } catch (error) {
    return output(500, "failed when fetching data from server", error);
  }
};
