const socket = io();

let listProducts = document.getElementById("listProducts");

socket.on("upDate", (products) => {
  listProducts.innerHTML = "";
  products.map((product) => {
    const list = document.createElement("div");
    const id = document.createAttribute("id");
    id.value = "product";
    list.setAttributeNode(id);
    list.innerHTML = `
    <img src=${product.thumbnail} alt=${product.title} />
    <h2>${product.title}</h2>
    <h4>${product.price} </h4>
    <p>${product.description}</p>`;
    listProducts.appendChild(list);
  });
});

let name = document.getElementById("name");
let submit = document.getElementById("submit");
let message = document.getElementById("message");
let messages = document.getElementById("messages");
let listChats = document.getElementById("listChats");

let newMessages = [];

socket.on("Welcome", (arg) => {
  newMessages = arg.messages;
  imprimirMessages(newMessages);
});

socket.on("loadChats", (chats) => {
  console.log(chats);
  listChats.innerHTML = "";
  chats.map((chat) => {
    let list = document.createElement("article");
    let classArticle = document.createAttribute("class");
    classArticle.value =
      "card text-center text-wrap shadow-lg bg-white rounded";
    list.setAttributeNode(classArticle);
    list.innerHTML = ` <div>
          <p id='name'>${chat.user}:  ${chat.message}</p>
        </div>
			`;
    listChats.appendChild(list);
  });
});

let user = null;

if (!user) {
  Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa tu email",
    allowOutsideClick: false,
    inputValidator: (value) => {
      return !value && "Necesitas escribir un nombre de usuario";
    },
  }).then((newUser) => {
    user = newUser.value;
    name.innerText = user;
    socket.emit("newUser", user);
  });
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const messageText = message.value.trim();
  message.value = "";
  socket.emit("message", {
    user,
    message: messageText,
    date: new Date().toDateString(),
  });
});

socket.on("message", (data) => {
  newMessages.push(data);
  imprimirMessages(newMessages);
});

function imprimirMessages(newMessages) {
  let _newMessages = "";
  for (const message of newMessages) {
    _newMessages += `${message.user}: ${message.message} - ${message.date}\n`;
  }
  messages.innerText = _newMessages;
}

socket.on("newUser", (nombre) => {
  Swal.fire({
    text: `Nuevo usuari@ ${nombre} conectad@!`,
    toast: true,
    position: "top-right",
  });
});
