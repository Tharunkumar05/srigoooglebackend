const express = require('express');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');
const {searchProductController, createProductController, getProductController,getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController} = require('../controllers/productController');
const formidable = require('express-formidable');

const router = express.Router();


router.post('/create-product', requireSignIn, isAdmin, formidable(),  createProductController);

router.get('/get-product', getProductController);

router.post('/product-filters', productFiltersController)

router.get('/get-product/:slug', getSingleProductController)

router.get('/search/:keyword', searchProductController)

router.delete('/delete-product/:pid', deleteProductController)

router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(), updateProductController) 

module.exports = router;