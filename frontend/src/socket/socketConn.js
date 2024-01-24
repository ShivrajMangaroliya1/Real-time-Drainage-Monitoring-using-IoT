import io from "socket.io-client";
const productionUrl = "https://draindemoo.herokuapp.com/";
const developmentUrl = "http://localhost:5000/";

let socket = io(productionUrl, {
  transports: ["websocket", "polling", "flashsocket"],
});

socket.on("connect", () => {
  console.log("connected");
});

export { io, socket };
