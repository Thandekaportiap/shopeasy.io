const express = require('express');
const Stripe = require('stripe');
const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY'); // Replace with your Stripe secret key
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { productId, quantity } = req.body;

    // Fetch product details from your database using productId
    // Assuming you have a function to get the product details
    const product = await getProductById(productId); // Replace with your actual product fetching logic

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    // Optionally, add an image
                    images: [product.image],
                },
                unit_amount: product.price * 100, // Stripe expects amount in cents
            },
            quantity: quantity,
        }],
        mode: 'payment',
        success_url: 'https://your-success-url.com', // Replace with your success URL
        cancel_url: 'https://your-cancel-url.com', // Replace with your cancel URL
    });

    res.json({ id: session.id });
});

module.exports = router;
