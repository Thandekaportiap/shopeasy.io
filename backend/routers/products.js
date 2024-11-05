module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    // Get all products
    router.get('/', async (req, res) => {
        const productsSnapshot = await db.collection('products').get();
        const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(products);
    });

    // Add a new product
    router.post('/', async (req, res) => {
        const newProduct = req.body;
        const productRef = await db.collection('products').add(newProduct);
        res.status(201).json({ id: productRef.id, ...newProduct });
    });

    // Update product availability
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        await db.collection('products').doc(id).update(req.body);
        res.status(204).send();
    });

    // Delete a product
    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        await db.collection('products').doc(id).delete();
        res.status(204).send();
    });

    // Hide a product (set available to false)
    router.patch('/:id/hide', async (req, res) => {
        const { id } = req.params;
        await db.collection('products').doc(id).update({ available: false });
        res.status(204).send();
    });

    return router;
};
