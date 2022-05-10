let cryptoToggle = document.querySelectorAll(".joinchat");

cryptoToggle.forEach((li) => {
  li.addEventListener("click", voegClasstoe);
  function voegClasstoe() {
    console.log(li);
    li.parentElement.classList.toggle("cryptopagina");
  }
});

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

//username en roomname uit de url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// enter chatroom
socket.emit("joinRoom", { username, room });

// room naam en user naam
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// bericht van de server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // scrollen
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // message tekst
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // emit message naar de server
  socket.emit("chatMessage", msg);

  // input legen
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

// voeg roomname toe naar frontend
function outputRoomName(room) {
  roomName.innerText = room;
}

// voeg users toe naar frontend
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//leaven
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "/";
  } else {
  }
});
