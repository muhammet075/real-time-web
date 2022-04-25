const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

let cryptoToggle = document.querySelectorAll(".joinchat");

for (let i = 0; i < cryptoToggle.length; i++) {
  cryptoToggle[i].addEventListener("click", voegClasstoe);

  function voegClasstoe() {
    cryptoToggle[i].parentElement.classList.toggle("cryptopagina");
  }
}

let closeform = document.querySelectorAll(".closeform");

for (let i = 0; i < closeform.length; i++) {
  closeform[i].addEventListener("click", sluitpopup);
  function sluitpopup() {
    let cryptopagina = document.querySelectorAll(".cryptopagina");
    for (let i = 0; i < cryptopagina.length; i++) {
      cryptopagina[i].classList.remove("cryptopagina");
    }
  }
}

let coinul = document.querySelectorAll(".coinul");

for (let i = 0; i < coinul.length; i++) {
  coinul[i].addEventListener("click", toonpagina);
  function toonpagina() {
    coinul[i].classList.toggle("coinulpage");
  }
}
document.querySelector("#zoekenKnop").addEventListener("click", toonZoekbalk);
document
  .querySelector("#zoekenSluiten")
  .addEventListener("click", sluitZoekbalk);
document.querySelector("#extraZoeken").addEventListener("click", sluitZoekbalk);

document
  .querySelector("#resultatenResetten")
  .addEventListener("click", resetZoekgegevens);

function toonZoekbalk() {
  document.querySelector(".zoekbalk").style.display = "block";
  document
    .querySelector(".zoekbalk")
    .classList.remove("zoekbalkAnimatieSluiten");
  document.querySelector(".zoekbalk").classList.add("zoekbalkAnimatie");
}

function sluitZoekbalk() {
  document.querySelector(".zoekbalk").classList.add("zoekbalkAnimatieSluiten");
  document.querySelector(".zoekbalk").classList.remove("zoekbalkAnimatie");

  setTimeout(() => {
    document.querySelector(".zoekbalk").style.display = "none";
  }, 130);
}

//Zoekbalk tonen
function toonZoekbalk() {
  document.querySelector(".zoekbalk").style.display = "block";
  document
    .querySelector(".zoekbalk")
    .classList.remove("zoekbalkAnimatieSluiten");
  document.querySelector(".zoekbalk").classList.add("zoekbalkAnimatie");
}

//Zoekbalk sluiten
function sluitZoekbalk() {
  document.querySelector(".zoekbalk").classList.add("zoekbalkAnimatieSluiten");
  document.querySelector(".zoekbalk").classList.remove("zoekbalkAnimatie");

  setTimeout(() => {
    document.querySelector(".zoekbalk").style.display = "none";
  }, 130);
}

//zoeken
document.querySelector("#zoekVeld").addEventListener("keyup", function () {
  console.log("onkeyup ", this.value);
  filterOnClass("cryptoGegevens", this.value);
});

//Filter zoek functie
function filterOnClass(baseClass, s) {
  console.log("s", s);
  document.querySelector("#resultatenResetten").style.display = "block";
  let re = new RegExp(s.trim(), "i");
  document.querySelectorAll("." + "cryptoContainer").forEach((node) => {
    let cNames = Array.from(node.classList);
    if (s.trim() == "") {
      node.style.display = "none";
    } else if (cNames.some((cName) => re.test(cName))) {
      node.style.display = "block";
    } else {
      node.style.display = "none";
    }
  });
}

//Filter zoek gegevens resetten
function resetZoekgegevens() {
  document.querySelector("#resultatenResetten").style.display = "none";
  document.querySelector("#zoekVeld").value = "";
  location.reload();
}

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
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

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "/";
  } else {
  }
});
