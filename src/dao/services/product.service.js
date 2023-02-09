import { ProductModel } from "../models/products.model.js";

export async function getProducts(limit, page, sort, query) {
  try {
    if (sort) {
      if (sort === "asc") sort = 1;
      if (sort === "desc") sort = -1;
    }
    let valores = {};
    if (query) {
      valores = {
        deletedAt: { $exists: false },
        category: query,
      };
    } else {
      valores = { deletedAt: { $exists: false } };
    }

    const products = await ProductModel.find(valores)
      .limit(limit)
      .skip(page !== 1 ? (page - 1) * limit : 0)
      .sort({ price: sort });
    const pages = Math.ceil(
      (await ProductModel.countDocuments(valores)) / limit
    );
    const actualPage = page;
    const prevPage = page - 1;
    const nextPage = page + 1;
    const hasPrevPage = prevPage <= 0 ? false : true;
    const hasNextPage = nextPage > pages ? false : true;

    const respuesta = {
      status: "succes",
      payload: products,
      totalPages: pages,
      page: actualPage,
      prevPage: prevPage,
      nextPage: nextPage,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
    };
    return respuesta;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProduct(pid) {
  try {
    const product = await ProductModel.find({ _id: Number(pid) }).lean();
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createProducts(data) {
  try {
    const product = await ProductModel.create(data);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateProduct(pid, data) {
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: pid },
      data,
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(pid) {
  try {
    const deleted = await ProductModel.deleteOne({ _id: pid });
    return deleted;
  } catch (error) {
    throw new Error(error.message);
  }
}
