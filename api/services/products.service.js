const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.addProduct();
  }

  addProduct() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async createProduct(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async getProducts() {
    return new Promise((resolve) => {
      resolve(this.products);
    });
  }

  async getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async updateProductById(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      const product = this.products[index];
      if (product.isBlock) {
        throw boom.conflict('Product is blocked');
      }
      this.products[index] = {
        ...product,
        ...changes,
      };
      return this.products[index];
    }
  }

  async deleteProductById(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
