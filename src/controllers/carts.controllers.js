import * as CartsService from "../dao/services/cart.service.js";
import { STATUS } from "../constants/constants.js";

export async function getCarts(req, res) {
  try {
    const response = await CartsService.getCarts();

    res.json({
      carts: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function getCart(req, res) {
  try {
    const { cid } = req.params;
    const response = await CartsService.getCart(cid);

    res.json({
      cart: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function createCart(req, res) {
  try {
    const { body } = req;
    const response = await CartsService.createCart(body);
    res.status(201).json({
      carts: response,
      status: STATUS.SUCCESS,
    });
    return response;
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function addProductToCart(req, res) {
  try {
    const { cid, pid } = req.params;
    const response = await CartsService.addProductToCart(cid, pid);
    res.status(200).json({
      user: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function deleteProduct(req, res) {
  try {
    const { cid, pid } = req.params;
    const response = await CartsService.deleteProduct(cid, pid);

    res.json({
      cart: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function deleteProducts(req, res) {
  try {
    const { cid } = req.params;
    const response = await CartsService.deleteProducts(cid);

    res.json({
      cart: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
