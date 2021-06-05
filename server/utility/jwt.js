import jwt from "jsonwebtoken";
import { output } from "./output.js";
const { verify, decode } = jwt;

export const authenticateJWT = async (req, res, next) => {
    try {
      // get token
      const auth = req.headers["authorization"];
      if (auth === undefined){
        let resp = output(500, "authenticate error, there is no token", null)
        res.status(500).send(resp)
      }

      const token = auth.split(" ")[1];
      verify(token, process.env.SECRETJWT);

      // get payload
      let payload = await get_payload(token)

      // add payload to req
      req.body.id = payload.id
      req.body.username = payload.username
      next();
    } catch (error) {
      res.status(500).send(error);
    }
  };

export const get_payload = async (token) => {
  return decode(token)
}