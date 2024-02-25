const fs = require("node:fs");
const pageRoutes = (req, res) => {
  const method = req.method;
  const parsedUrl = new URL(`http://${req.headers.host}${req.url}`);
  const path = parsedUrl.pathname;
  switch (method) {
    case "GET":
      switch (path) {
        case "/":
          fs.readFile("../front/index.html", (err, data) => {
            if (err) {
              throw new Error(err);
            }
            res.status = 200;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(data);
          });
      }
      break;
    case "POST":
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
  }
};
module.exports = pageRoutes;
