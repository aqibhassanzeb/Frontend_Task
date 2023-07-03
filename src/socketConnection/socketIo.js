import { io } from "socket.io-client";
import { socketUrl } from "../config";

let socket = null;

export const establishConnection = (accessUser) => {
  if (accessUser) {
    socket = io(socketUrl);
    socket.emit("setup", accessUser !== null && accessUser);
    socket.on("connected", () => console.log("connected "));
  } else {
    socket = null;
  }
};

export const getSocket = () => {
  return socket;
};
