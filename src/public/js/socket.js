const socket = io();

let listProducts = document.getElementById("listProducts");

socket.on("upDate", (products) => {
  listProducts.innerHTML = "";
  products.payload.map((product) => {
    const list = document.createElement("div");
    const id = document.createAttribute("id");
    id.value = "product";
    list.setAttributeNode(id);
    list.innerHTML = `
    <img src=${product.thumbnail} alt=${product.title} />
    <h2>${product.title}</h2>
    <h4>${product.price} </h4>
    <p>${product.description}</p>
    <p>${product._id}</p>`;
    listProducts.appendChild(list);
  });
});
