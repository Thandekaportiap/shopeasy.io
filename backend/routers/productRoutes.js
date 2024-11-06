const express = require('express');
const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    hideProduct,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', addProduct); // No auth middleware needed as Firebase handles auth
router.put('/:id', updateProduct); // You can implement a middleware for admin checks
router.delete('/:id', deleteProduct); // You can implement a middleware for admin checks
router.patch('/:id/hide', hideProduct); // You can implement a middleware for admin checks

module.exports = router;
