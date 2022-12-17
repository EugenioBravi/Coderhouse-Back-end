import { existsSync, readFileSync, writeFileSync } from "fs";

export default class ProductManager {
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

  async addProduct(
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnail
  ) {
    let res = 400;
    const products = this.#readFile();
    const findCode = products.find((product) => product.code === code);

    if (!findCode) {
      products.push({
        id: this.#getMaxId() + 1,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      });
      this.#writeProducts(products);
      console.log("product added");
      res = 200;
    } else {
      console.log("product code already exist");
    }
    return res;
  }

  #getMaxId() {
    let maxId = 0;
    this.#readFile().map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }

  async getProducts() {
    let product = this.#readFile();
    return product;
  }

  async getProductById(id) {
    const product = this.#readFile().find((product) => product.id === id);
    if (product) {
      return product;
    }
    return "Not found";
  }
  async updateProduct(id, key, value) {
    let products = this.#readFile();
    const product = products.find((producto) => producto.id === id);
    product[key] = value;
    this.deleteProduct(id);
    products = this.#readFile();
    products.push(product);
    this.#writeProducts(products);
    console.log("Producto Actualizado");
    return products.filter((product) => product.id === id);
  }
  async deleteProduct(id) {
    const products = this.#readFile();
    const filteredProducts = products.filter((product) => product.id !== id);
    if (filteredProducts !== products) {
      this.#writeProducts(filteredProducts);
      return filteredProducts;
    }
    return "Product doesn't exist";
  }
}
