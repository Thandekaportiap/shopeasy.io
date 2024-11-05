const express = require('express');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Secret key from env
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        // Fetch product details here (assuming `getProductById` fetches price in cents)
        const product = await getProductById(productId);

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price * 100, // Amount in cents
                    },
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: 'https://your-website.com/success',
            cancel_url: 'https://your-website.com/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

module.exports = router;
