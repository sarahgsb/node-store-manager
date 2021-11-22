const express = require('express');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post(
  '/products',
  productsController.nameLengthValidation,
  productsController.sameNameValidation,
  productsController.emptyQuantityValidation,
  productsController.stringValidation,
  productsController.createNewProduct,
);

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductsId);

app.put(
  '/products/:id',
  productsController.nameLengthValidation,
  productsController.emptyQuantityValidation,
  productsController.stringValidation,
  productsController.updateNewProduct,
);

app.delete(
  '/products/:id',
  productsController.verifyID,
  productsController.deleteProduct,
);

app.post('/sales', salesController.quantityValidation, salesController.create);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.put(
  '/sales/:id',
  salesController.quantityValidation,
  salesController.updateSale,
);

app.delete('/sales/:id', salesController.deleteSale);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
