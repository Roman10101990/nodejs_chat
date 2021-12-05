let express = require("express");
let app = express();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/assets"));

io.on("connection", socket => {
  socket.on("chat message", data => {
    io.emit("chat message", {
      message: data.message,
      name: data.name
    });
  });
});

let start = async () => {
  await http.listen(3000, () => {
    console.log("Server is running..");
  });
};
start();
