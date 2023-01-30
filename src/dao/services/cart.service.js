import { CartModel } from "../models/cart.model.js";

export async function getCarts() {
  try {
    const carts = await CartModel.find({ deletedAt: { $exists: false } });
    return carts;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getCart(cid) {
  try {
    const cart = await CartModel.findById(cid).populate("products.product");
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createCart(data) {
  try {
    console.log(data);
    const cart = await CartModel.create(data);
    console.log(cart);
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addProductToCart(cid, pid) {
  try {
    const cart = await CartModel.findById(cid);
    if (cart) {
      const productToUpdate = cart.products.find(
        (product) => product.product == pid
      );
      if (productToUpdate) {
        productToUpdate.quantity = productToUpdate.quantity + 1;
      } else {
        cart.products.push({ product: pid });
      }
      await CartModel.findByIdAndUpdate(cid, cart, { new: true });
    }
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(cid, pid) {
  try {
    const cart = await CartModel.findById(cid);
    if (cart) {
      cart.products = cart.products.filter((product) => product.product != pid);
      await CartModel.findByIdAndUpdate(cid, cart, { new: true });
    }
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProducts(cid) {
  try {
    const cart = await CartModel.findById(cid);
    if (cart) {
      cart.products = [];
      await CartModel.findByIdAndUpdate(cid, cart, { new: true });
    }
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}
