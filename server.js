const path = require("path");
const http = require("http");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Set static folder
//app.use(express.static(path.join(__dirname, "public")));
//de css, img en js map in de public map gebruiken
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public.css"));
app.use("/img", express.static(__dirname + "public.img"));
app.use("/js", express.static(__dirname + "public.js"));
app.use("/fonts", express.static(__dirname + "public.fonts"));

//express layout mobiel formaat en ejs gebruiken
app.use(expressLayouts);
app.set("layout", "./layouts/mobiel-formaat");
app.set("view engine", "ejs");

//local storage
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const botName = "CryptoAbi Bot";

// wordt gerunt wanner client is geconnect
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // gebruiker verwelkomen
    socket.emit("message", formatMessage(botName, "Welcome to the chatroom!"));

    // broadcast
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

app.get("/", handleApi, (req, res) => {
  res.render("index");
});

async function handleApi(req, res) {
  const cryptoApi = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=30&page=1&sparkline=false"
  )
    .then((res) => res.json())
    .then((json) => {
      let array = [];

      for (let i = 0; i < json.length; i++) {
        array.push(json[i]);
      }
      for (let i = 0; i < array.length; i++) {
        console.log(array[i].name);
      }

      const jsonArr = JSON.stringify(array);
      localStorage.setItem("data", jsonArr);

      res.render("index", {
        array: array,
      });
    });
}

app.get("/chatrooms", (req, res) => {
  let item = JSON.parse(localStorage.getItem("data"));
  res.render("chatrooms", {
    item: item,
  });
});

//aanmelden route
app.get("/chat", (req, res) => {
  res.render("chat");
});

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
