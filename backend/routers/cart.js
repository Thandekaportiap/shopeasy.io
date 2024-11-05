module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    // Get user's cart
    router.get('/:userId', async (req, res) => {
        const { userId } = req.params;
        const cartSnapshot = await db.collection('carts').doc(userId).get();
        
        if (!cartSnapshot.exists) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.json(cartSnapshot.data());
    });

    // Add product to cart
    router.post('/:userId', async (req, res) => {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        const cartRef = db.collection('carts').doc(userId);
        const cartSnapshot = await cartRef.get();

        if (cartSnapshot.exists) {
            // Update existing cart
            const cartData = cartSnapshot.data();
            const productIndex = cartData.products.findIndex(item => item.productId === productId);
            
            if (productIndex > -1) {
                // If product already in cart, update quantity
                cartData.products[productIndex].quantity += quantity;
            } else {
                // If product not in cart, add it
                cartData.products.push({ productId, quantity });
            }

            await cartRef.update(cartData);
        } else {
            // Create new cart
            const newCart = { products: [{ productId, quantity }] };
            await cartRef.set(newCart);
        }

        res.status(201).json({ message: 'Product added to cart' });
    });

    // Update product quantity in cart
    router.put('/:userId/:productId', async (req, res) => {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        const cartRef = db.collection('carts').doc(userId);
        const cartSnapshot = await cartRef.get();

        if (!cartSnapshot.exists) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const cartData = cartSnapshot.data();
        const productIndex = cartData.products.findIndex(item => item.productId === productId);
        
        if (productIndex > -1) {
            // Update quantity
            cartData.products[productIndex].quantity = quantity;
            await cartRef.update(cartData);
            res.json({ message: 'Product quantity updated' });
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    });

    // Remove product from cart
    router.delete('/:userId/:productId', async (req, res) => {
        const { userId, productId } = req.params;

        const cartRef = db.collection('carts').doc(userId);
        const cartSnapshot = await cartRef.get();

        if (!cartSnapshot.exists) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const cartData = cartSnapshot.data();
        const updatedProducts = cartData.products.filter(item => item.productId !== productId);
        await cartRef.update({ products: updatedProducts });

        res.json({ message: 'Product removed from cart' });
    });

    // Checkout (clear cart)
    router.post('/:userId/checkout', async (req, res) => {
        const { userId } = req.params;
        
        const cartRef = db.collection('carts').doc(userId);
        const cartSnapshot = await cartRef.get();

        if (!cartSnapshot.exists) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Here you would integrate payment processing logic

        // Clear the cart after successful checkout
        await cartRef.set({ products: [] });
        res.json({ message: 'Checkout successful' });
    });

    return router;
};
