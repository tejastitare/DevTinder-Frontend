import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const socket = io(BASE_URL, {
  withCredentials: true,

  path: "/socket.io", // (default hai, likho ya chhodo)

  transports: ["websocket"], // optional but good for reliability
});
