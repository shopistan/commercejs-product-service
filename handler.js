"use strict";
require('./app/config/db');
const send = require('./app/utils/response');
const ProductsController = require('./app/controllers/products');
const create = async (event) => {
  try {
    let response = await ProductsController.create(event.body);
    return send(response);
  } catch (error) {
    return send(error)
  }
};

const count = async (event) => {
  try {
    let response = await ProductsController.count();
    return send(response);
  } catch (error) {
    return send(error);
  }
};

const all = async (event) => {
  try {
    let response = await ProductsController.all();
    return send(response);
  } catch (error) {
    return send(error);
  }
};

const findBySku = async (event) => {
  try {
    let response =  await ProductsController.findBySku(event.pathParameters.sku);
    return send(response);
  } catch (error) {
    return send(error);
  }
};

const update = async (event) => {
  try {
    let response = await ProductsController.update(event.body);
    return send(response);
  } catch (error) {
    return send(error);
  }
};

const deleteProduct = async (event) => {
  try {
    let productDeleted = await ProductsController.deleteProduct(event.pathParameters.sku);
    return send(productDeleted);
  } catch (error) {
    return send(error);
  }
};

module.exports = {
  create,
  count,
  all,
  update,
  deleteProduct,
  findBySku,
};