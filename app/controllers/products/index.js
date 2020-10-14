const Product = require("../../models/Product");
const sns = require('../../utils/sns-release-event');
const all = async () => {
  return await Product.find({});
};
const count = async () => {
  let countProducts = await Product.countDocuments();
  return {count: countProducts};
};
const create = async (body) => {
  data = JSON.parse(body);
  let newProduct = new Product();
  newProduct.name = data.name;
  newProduct.sku = data.sku;
  newProduct.type = data.type;
  newProduct.image = data.image;
  newProduct.status = data.status;
  let product = await newProduct.save();
  let message = [{ sku:  data.sku, "quantity": 0 }];

  return {
    snsResponse: await sns(message,'productCreated','productCreated'),
    product
    //usage sns(message, subject, topic)
  };
};
const deleteProduct = async (sku) => {
  return await Product.findOneAndRemove({ sku: sku });
};
const update = async (body) => {
  data = JSON.parse(body);
  return await Product.findOneAndUpdate(
    { sku: data.sku },
    {
      $set: {
        name: data.name,
        type: data.type,
        image: data.image,
        status: data.status,
      },
    }
  );
};
const findBySku = async (sku) => {
  return await Product.find({ sku: sku });
};
module.exports = {
  all,
  count,
  create,
  deleteProduct,
  update,
  findBySku,
};
