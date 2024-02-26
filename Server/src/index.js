const http = require("node:http");
const fs = require("node:fs");
const WebSocket = require("ws");
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
//Ws connection
const wss = new WebSocket.Server({
  server: server,
  perMessageDeflate: false,
});

wss.on("connection", function connection(ws) {
  console.log("WebSocket client connected successfully."); // Mensaje de registro
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    ws.send("Mensaje recibido por el servidor " + data);
  });
  ws.send("Conectado Hijo de remil puta");
});

server.listen(PORT, () => {
  console.log(`App listen in port http://${HOSTNAME}:${PORT}`);
});
