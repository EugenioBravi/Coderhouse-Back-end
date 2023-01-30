import { CartModel } from "../models/cart.model.js";

export async function getCart(cid) {
  try {
    const cart = await CartModel.findById(cid).populate("products.producto");
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createCart(data) {
  try {
    const cart = await CartModel.create(data);
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addProductToCart(cid, pid) {
  try {
    const cart = await CartModel.findById(cid);
    const products = cart.products;
    let exist = false;
    let quantity = 1;
    for (let product of products) {
      const productId = product.producto;
      if (productId === pid) {
        exist = true;
        quantity = product.quantity + 1;
      }
    }
    if (exist) {
      await CartModel.findOneAndUpdate(
        { _id: cid, products: { $elemMatch: { producto: pid } } },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
      return "Cantidad incrementada";
    } else {
      cart.products.push({ producto: pid, quantity: quantity });
      cart.save();
      return "Producto agregado";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function updateProductQty(cartId, productId, quantity) {
  try {
    const cart = await CartModel.findById(cartId);
    if (cart) {
      const productToUpdate = cart.products.find(
        (product) => product.product == productId
      );
      if (productToUpdate) {
        productToUpdate.quantity = quantity;
      } else {
        cart.products.push({ product: productId, quantity: quantity });
      }
      await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
    }
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(cartId, productId) {
  try {
    const cart = await CartModel.findById(cartId);
    if (cart) {
      cart.products = cart.products.filter(
        (product) => product.product != productId
      );
      await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
    }
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProducts(cartId) {
  try {
    const cart = await CartModel.findById(cartId);
    if (cart) {
      cart.products = [];
      await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
    }
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}
