import { existsSync, readFileSync, writeFileSync } from "fs";
const { log } = console;
class ProductManager {
  #readFile() {
    return JSON.parse(readFileSync(this.path));
  }
  #writeProducts(products) {
    return writeFileSync(this.path, JSON.stringify(products));
  }
  constructor(filePath) {
    this.path = filePath;
    if (existsSync(this.path)) {
      this.#readFile();
    } else {
      this.#writeProducts([]);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const products = this.#readFile();
    const findCode = products.find((product) => product.code === code);
    if (!findCode) {
      products.push({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.#getMaxId() + 1,
      });
      this.#writeProducts(products);
      return "product added";
    }
    return "product code already exist";
  }

  #getMaxId() {
    let maxId = 0;
    this.#readFile().map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  getProducts() {
    return this.#readFile();
  }

  getProductById(id) {
    const product = this.#readFile().find((product) => product.id === id);
    if (product) {
      return product;
    }
    return "Not found";
  }
  updateProduct(id, key, value) {
    let products = this.#readFile();
    const product = products.find((producto) => producto.id === id);
    product[key] = value;
    this.deleteProduct(id);
    products = this.#readFile();
    products.push(product);
    this.#writeProducts(products);
    console.log("Producto Actualizado");
  }
  deleteProduct(id) {
    const products = this.#readFile();
    const filteredProducts = products.filter((product) => product.id !== id);
    if (filteredProducts !== products) {
      this.#writeProducts(filteredProducts);
      return "Product deleted";
    }
    return "Product doesn't exist";
  }
}
// testing

const test = new ProductManager("./products.json");
log(test.getProducts());
test.addProduct(
  "producto prueba 1",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
test.addProduct(
  "producto prueba 2",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc1213",
  25
);
test.addProduct(
  "producto prueba 3",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc1213aa",
  25
);
log(test.getProducts());
log(test.getProductById(2));
log(test.getProductById(5));
test.updateProduct(2, "title", "aaaaaaaaaaaaaaaaaaaa");
log(test.getProductById(2));
test.deleteProduct(2);
log(test.getProductById(2));
