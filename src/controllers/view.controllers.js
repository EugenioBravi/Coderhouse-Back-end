import * as ProductsService from "../dao/services/product.service.js";
import * as cartsService from "../dao/services/cart.service.js";
import { STATUS } from "../constants/constants.js";
export async function getHomeProducts(req, res) {
  try {
    let limit = req.query.limit || 10;
    let page = Number(req.query.page) || 1;
    let sort = req.query.sort;
    let query = req.query.query;

    const response = await ProductsService.getProducts(
      limit,
      page,
      sort,
      query
    );
    const docs = response.payload;
    const products = [];
    for (const product of docs) {
      products.push(product._doc);
    }
    res.render("home", {
      response,
      products,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function getProducts(req, res) {
  try {
    let limit = req.query.limit || 10;
    let page = Number(req.query.page) || 1;
    let sort = req.query.sort;
    let query = req.query.query;

    const response = await ProductsService.getProducts(
      limit,
      page,
      sort,
      query
    );
    const pageData = {
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page: response.page,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
    };
    const docs = response.payload;
    const products = [];
    for (const product of docs) {
      products.push(product._doc);
    }
    res.render("products", {
      pageData,
      products,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export const getCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const getCart = await cartsService.getCart(cid);
    const cart = [];
    for (const products of getCart.products) {
      cart.push({
        ...products.product._doc,
        quantity: products.quantity,
      });
    }
    res.render("carts", {
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: STATUS.FAIL,
      message: error.message,
    });
  }
};
