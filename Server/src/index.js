const http = require("node:http");
const pageRoutes = require("./routes/routes");

const HOSTNAME = "127.0.0.1";
const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`http://${req.headers.host}${req.url}`);
  const path = parsedUrl.pathname;
  switch (path) {
    case "/":
      pageRoutes(req, res);
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
  }
});
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("newuser", (username) => {
    console.log("username", username);
    console.log("update", username + " joined the conversation");
    socket.broadcast.emit("update", username + " joined the conversation");

    console.log(
      socket.broadcast.emit("update", username + " joined the conversation")
    );
  });
  socket.on("exituser", (username) => {
    socket.broadcast.emit("update", username + " left the conversation");
  });
  socket.on("chat", (message) => {
    console.log("Mensaje de actualización recibido:", message);
    socket.broadcast.emit("chat", message);
  });
});
server.listen(PORT, () => {
  console.log(`App listen in port http://${HOSTNAME}:${PORT}`);
});
