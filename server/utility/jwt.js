import jwt from "jsonwebtoken";
const { verify, decode } = jwt;

export const authenticateJWT = async (req, res, next) => {
    // res.send("halo")
    try {
      const auth = req.headers["authorization"];
      const token = auth.split(" ")[1];
      verify(token, process.env.SECRETJWT);
      req.body.token = token
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  };

export const get_payload = async (token) => {
  return decode(token)
}