var socket = io();
let messages = document.querySelector(".message");
let form = document.querySelector(".form");
let nameUser = document.querySelector(".name");
let inputText = document.querySelector(".inputText");

let inputName = prompt("Enter your name");
nameUser.innerHTML = `${inputName}`;

form.addEventListener("submit", e => {
  e.preventDefault();
  if (inputText.value) {
    socket.emit("chat message", {
      message: inputText.value,
      name: inputName
    });
    inputText.value = "";
  }
});

socket.on("chat message", data => {
  let item = document.createElement("li");
  item.innerHTML = `<span>${data.name}</span>: ${data.message}`;
  messages.appendChild(item);
});
