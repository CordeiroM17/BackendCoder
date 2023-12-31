import { productService } from '../services/products.service.js';
import { logger } from '../utils/logger.js';

export const productsController = {
  getAllProducts: async function (req, res) {
    try {
      const { page, limit } = req.query;
      const products = await productService.getProducts(page, limit);
      let productsMap = products.docs.map((prod) => {
        return {
          id: prod._id,
          title: prod.title,
          description: prod.description,
          thubmail: prod.thubmail,
          price: prod.price,
          code: prod.code,
          stock: prod.stock,
        };
      });
      return res.status(200).json({
        status: 'Success',
        payload: productsMap,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
      });
    } catch (error) {
      logger.error(`${error}`);
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrong',
        data: { error },
      });
    }
  },

  showOneProduct: async function (req, res) {
    try {
      let productId = req.params.pid;
      const productFound = await productService.getProductById(productId);
      return res.status(200).json({
        status: 'Success',
        msg: 'Product found',
        data: productFound,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'Product not found',
        data: { error },
      });
    }
  },

  deleteOneProduct: async function (req, res) {
    try {
      const pid = req.params.pid;
      await productService.deleteProduct(pid);
      return res.status(200).json({
        status: 'Success',
        msg: 'Product deleted',
        data: {},
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'Product not exist',
        data: { error },
      });
    }
  },

  createOneProduct: async function (req, res) {
    try {
      const file = req.file;
      const productToCreate = req.body;
      const productCreated = await productService.createProduct(productToCreate, file);
      return res.status(201).json({
        status: 'Success',
        msg: 'Product created',
        data: productCreated,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'Product not created',
        data: { error },
      });
    }
  },

  updateOneProduct: async function (req, res) {
    try {
      const pid = req.params.pid;
      const newProduct = req.body;
      await productService.putProduct(pid, newProduct);
      return res.status(201).json({
        status: 'Success',
        msg: 'Successfully modified product',
        data: newProduct,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'Error',
        msg: 'Could not modify object',
        data: { error },
      });
    }
  },
};
