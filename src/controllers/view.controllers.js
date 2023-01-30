import * as ProductsService from "../dao/services/product.service.js";
import { STATUS } from "../constants/constants.js";
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
