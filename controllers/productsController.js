const service = require('../services/productsService');

const nameLengthValidation = (request, response, next) => {
  const { name } = request.body;

  if (!service.lengthValidation(name)) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  next();
};

const sameNameValidation = async (request, response, next) => {
  const { name } = request.body;
  const productExists = await service.isProductExists(name);

  if (productExists) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

const emptyQuantityValidation = (request, response, next) => {
  const { quantity } = request.body;

  if (!service.quantityValidation(quantity)) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  next();
};

const stringValidation = (request, response, next) => {
  const { quantity } = request.body;

  if (service.quantityStringValidation(quantity)) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  next();
};

const createNewProduct = (request, response) => {
  const { name, quantity } = request.body;
  service
    .createProduct({ name, quantity })
    .then((result) => response.status(201).json(result));
};

const getProducts = (_request, response) => {
  service
    .getAllProducts()
    .then((result) => response.status(200).json({ products: result }));
};

const getProductsId = (request, response) => {
  const { id } = request.params;

  service.getAllId(id).then((result) => {
    if (!result) {
      return response.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    return response.status(200).json(result);
  });
};

const verifyID = async (request, response, next) => {
  const { id } = request.params;

  service.getAllId(id).then((results) => {
    if (!results) {
      return response.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    return response.status(200).json(results);
  });

  next();
};

const updateNewProduct = async (request, response) => {
  const { name, quantity } = request.body;
  const { id } = request.params;

  service
    .updateProduct(id, name, quantity)
    .then((result) => response.status(200).json(result));
};

const deleteProduct = async (request, _response) => {
  const { id } = request.params;

  service.deleteProducts(id);
};

module.exports = {
  nameLengthValidation,
  sameNameValidation,
  emptyQuantityValidation,
  stringValidation,
  createNewProduct,
  getProducts,
  getProductsId,
  updateNewProduct,
  verifyID,
  deleteProduct,
};
