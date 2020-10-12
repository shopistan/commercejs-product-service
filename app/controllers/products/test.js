const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));
const faker = require('faker');
const Product = require("../../models/Product");
const ProductsController = require('./index');
const testHelper = require('../../utils/test.helper');

beforeEach(testHelper.setupTest);

const productBody = new Product({
    name: faker.commerce.productName(),
    sku: faker.commerce.productName(),
    type: 'simple',
    image: faker.image.imageUrl(),
    status: faker.random.boolean(),
  });

const getProductSku = () => {
  return productBody.sku;
};

describe('Products', () => {
  describe('Create', () => {
    it('should return created product', async () => {
      const result = await ProductsController.create(JSON.stringify(productBody));
      expect(result.product.name).to.equal(productBody.name);
      expect(result.product.sku).to.equal(productBody.sku);
      expect(result.product.type).to.equal(productBody.type);
      expect(result.product.image).to.equal(productBody.image);
      expect(result.product.status).to.equal(productBody.status);

    });
    it('should return the product or empty', async () => {
      let sku = await getProductSku();
      console.log(sku);
      const result = await ProductsController.findBySku(sku);
      console.log(result);
      expect(result[0].sku).to.equal(sku) || expect(result).to.equal({});
    });
    it('should return array of products', async () => {
      const result = await ProductsController.all();
      expect(typeof result).to.equal('object');
    });
    it('should return count of the products', async () => {
      const result = await ProductsController.count();
      expect(typeof result.count).to.equal('number');
    });
    it('should return updated product', async () => {
      const result = await ProductsController.update(JSON.stringify(productBody));
      expect(result.name).to.equal(productBody.name);
      expect(result.sku).to.equal(productBody.sku);
      expect(result.type).to.equal(productBody.type);
      expect(result.image).to.equal(productBody.image);
      expect(result.status).to.equal(productBody.status);
    });
    it('should return deleted product', async () => {
      let sku = await getProductSku();
      const result = await ProductsController.deleteProduct(sku);
      expect(result.sku).to.equal(sku);
    });
  });
});
