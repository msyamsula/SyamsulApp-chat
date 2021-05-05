import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.REACT_APP_SECRETJWT, {
    expiresIn: `${process.env.REACT_APP_JWT_EXPIRE_TIME}m`,
  });
  return token;
};

export const getPayloadToken = (token) => {
  const payload = jwt.verify(token, process.env.REACT_APP_SECRETJWT);
  return payload;
};

export const prepareHeaderConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const getTokenFromURL = (url) => {
    return url.split('?')[1]
}