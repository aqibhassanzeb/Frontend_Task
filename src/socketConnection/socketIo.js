import { io } from "socket.io-client";

let socket = null;

export const establishConnection = (accessUser) => {
  if (accessUser) {
    socket = io("http://localhost:3333");
    socket.emit("setup", accessUser !== null && accessUser);
    socket.on("connected", () => console.log("connected "));
  } else {
    socket = null;
  }
};

export const getSocket = () => {
  return socket;
};
