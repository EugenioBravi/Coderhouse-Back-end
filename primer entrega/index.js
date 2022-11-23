class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const findCode = this.products.find((product) => product.code === code);
    if (!findCode) {
      this.products.push({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.#getMaxId() + 1,
      });
      return "product added";
    }
    return "product code already exist";
  }

  #getMaxId() {
    let maxId = 0;
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    }
    return "Not found";
  }
}
const { log } = console;
const almacen = new ProductManager();

log(almacen.getProducts());
almacen.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
log(almacen.getProducts());
log(
  almacen.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  )
);
log(almacen.getProductById(1));
log(almacen.getProductById(2));
