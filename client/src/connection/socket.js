import openSocket from "socket.io-client";
const customHeader = process.env.REACT_APP_CORS_HEADER

export let socket = openSocket(process.env.REACT_APP_CHAT_BACKEND, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": customHeader,
  },
});
